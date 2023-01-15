import { typify } from "./global.module";
import type {
  GlobalContextType,
  ActionPayloads,
  NonTypedActionNames,
} from "./global.types";

const typed = typify<GlobalContextType, ActionPayloads, NonTypedActionNames>();

export const getGlobal = typed.getGlobal;
export const addActionHandler = typed.addActionHandler;
export const useGlobal = typed.useGlobal;
export const dispatch = typed.dispatch;
