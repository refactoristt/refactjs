export type TimeFormat = "24h" | "12h";
export interface ApiLangString {
  key: string;
  value?: string;
  zeroValue?: string;
  oneValue?: string;
  twoValue?: string;
  fewValue?: string;
  manyValue?: string;
  otherValue?: string;
}

export type ApiLangPack = Record<string, ApiLangString>;
import * as cacheApi from "./cacheApi";
import { createCallbackManager } from "../src/util/callbacks";
import { formatInteger } from "./textFormat";
import { getActions, getGlobal } from "@global/index";

interface LangFn<LangCode> {
  (key: string, value?: any, format?: "i"): any;

  isRtl?: boolean;
  code?: LangCode;
  langName?: string;
  timeFormat?: TimeFormat;
}

const SUBSTITUTION_REGEX = /%\d?\$?[sdf@]/g;
const PLURAL_OPTIONS = [
  "value",
  "zeroValue",
  "oneValue",
  "twoValue",
  "fewValue",
  "manyValue",
  "otherValue",
] as const;
// Some rules edited from https://github.com/eemeli/make-plural/blob/master/packages/plurals/cardinals.js
const PLURAL_RULES = {
  /* eslint-disable max-len */
  en: (n: number) => (n !== 1 ? 6 : 2),
  fa: (n: number) => (n > 1 ? 6 : 2),
};

const cache = new Map<string, string>();

let langPack: ApiLangPack | undefined;
let fallbackLangPack: ApiLangPack | undefined;

const { addCallback, removeCallback, runCallbacks } = createCallbackManager();

export { addCallback, removeCallback };

let currentLangCode: string | undefined;
let currentTimeFormat: TimeFormat | undefined;

export function getTranslation<T extends string>(
  key: string,
  value?: any,
  format?: "i"
): LangFn<T> {
  const lang = getGlobal().settings.byKey.language;
  if (value !== undefined) {
    const cacheValue = Array.isArray(value) ? JSON.stringify(value) : value;

    const cached = cache.get(`${key}_${cacheValue}_${format}`);
    if (cached) {
      return cached;
    }
  }

  if (!langPack && !fallbackLangPack) {
    return key;
  }

  const langString = langPack?.[key] || fallbackLangPack?.[key];

  if (!langString) {
    if (!fallbackLangPack) {
      void fetchRemote(lang);
    }

    return key;
  }

  return processTranslation(langString, key, value, format);
}

export async function getTranslationForLangString(
  langCode: string,
  key: string
) {
  let translateString: ApiLangString | undefined = await cacheApi.fetch(
    LANG_CACHE_NAME,
    `${DEFAULT_LANG_PACK}_${langCode}_${key}`,
    cacheApi.Type.Json
  );

  if (!translateString) {
    translateString = await fetchRemoteString(DEFAULT_LANG_PACK, langCode, key);
  }

  return processTranslation(translateString, key);
}

export async function setLanguage<LangCode extends string>(
  langCode: LangCode,
  callback?: () => void,
  withFallback = false
) {
  getActions().changeSetting({
    language: langCode,
  });
  if (langCode === "fa") {
    document.body.dir = "rtl";
  } else {
    document.body.dir = "ltr";
  }
  if (langPack && langCode === currentLangCode) {
    if (callback) {
      callback();
    }

    return;
  }

  let newLangPack = await cacheApi.fetch(
    LANG_CACHE_NAME,
    langCode,
    cacheApi.Type.Json
  );
  if (!newLangPack) {
    if (withFallback) {
      await importFallbackLangPack();
    }

    newLangPack = await fetchRemote(langCode);
    if (!newLangPack) {
      return;
    }
  }

  cache.clear();

  currentLangCode = langCode;
  langPack = newLangPack;
  document.documentElement.lang = langCode;

  // const { languages, timeFormat } = getGlobal().settings.byKey;
  // const langInfo = languages?.find((l) => l.langCode === langCode);
  getTranslation.isRtl = false;
  // getTranslation.code = langCode;
  // getTranslation.langName = langInfo?.nativeName;
  // getTranslation.timeFormat = timeFormat;

  if (callback) {
    callback();
  }

  runCallbacks();
}

export function setTimeFormat(timeFormat: TimeFormat) {
  if (timeFormat && timeFormat === currentTimeFormat) {
    return;
  }

  currentTimeFormat = timeFormat;
  getTranslation.timeFormat = timeFormat;

  runCallbacks();
}

async function importFallbackLangPack() {
  if (fallbackLangPack) {
    return;
  }

  fallbackLangPack = (await import("../src/translations/en")).default;
  runCallbacks();
}

async function fetchRemote(langCode: string): Promise<ApiLangPack | undefined> {
  const fallbackLangPack = (await import(`../translations/${langCode}`))
    .default;
  if (fallbackLangPack) {
    await cacheApi.save(LANG_CACHE_NAME, langCode, fallbackLangPack);
    return fallbackLangPack;
  }

  return undefined;
}

async function fetchRemoteString(
  remoteLangPack: (typeof LANG_PACKS)[number],
  langCode: string,
  key: string
): Promise<ApiLangString | undefined> {
  // const remote = await callApi('fetchLangStrings', {
  //   langPack: remoteLangPack,
  //   langCode,
  //   keys: [key],
  // });
  //
  // if (remote?.length) {
  //   await cacheApi.save(LANG_CACHE_NAME, `${remoteLangPack}_${langCode}_${key}`, remote[0]);
  //
  //   return remote[0];
  // }

  return undefined;
}

function getPluralOption(amount: number) {
  const langCode = currentLangCode || DEFAULT_LANG_CODE;
  const optionIndex = PLURAL_RULES[langCode as keyof typeof PLURAL_RULES]
    ? PLURAL_RULES[langCode as keyof typeof PLURAL_RULES](amount)
    : 0;

  return PLURAL_OPTIONS[optionIndex];
}

function processTemplate(template: string, value: any) {
  value = Array.isArray(value) ? value : [value];
  const translationSlices = template.split(SUBSTITUTION_REGEX);
  const initialValue = translationSlices.shift();

  return translationSlices.reduce((result, str, index) => {
    return `${result}${String(value[index] ?? "")}${str}`;
  }, initialValue || "");
}

function processTranslation(
  langString: ApiLangString | undefined,
  key: string,
  value?: any,
  format?: "i"
) {
  const preferredPluralOption =
    typeof value === "number" ? getPluralOption(value) : "value";
  const template = langString
    ? langString[preferredPluralOption] ||
      langString.otherValue ||
      langString.value
    : undefined;
  if (!template || !template.trim()) {
    const parts = key.split(".");

    return parts[parts.length - 1];
  }

  if (value !== undefined) {
    const formattedValue = format === "i" ? formatInteger(value) : value;
    const result = processTemplate(template, formattedValue);
    const cacheValue = Array.isArray(value) ? JSON.stringify(value) : value;
    cache.set(`${key}_${cacheValue}_${format}`, result);
    return result;
  }

  return template;
}
