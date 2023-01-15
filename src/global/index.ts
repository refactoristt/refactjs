import { typify } from "./global.module";
import type {
  GlobalContextType,
  ActionPayloads,
  NonTypedActionNames,
} from "./global.types";
import { ThemeEnum } from "./global.types";

type TypedActions = {
  setTheme: ThemeEnum;
};
type NonTypedActions = {};

const typed = typify<GlobalContextType, TypedActions, NonTypedActions>();

export const getGlobal = typed.getGlobal;
export const addActionHandler = typed.addActionHandler;
export const useGlobal = typed.useGlobal;
export const dispatch = typed.dispatch;
export const getActions = typed.getActions;
