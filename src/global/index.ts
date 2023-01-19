import { typify } from "../../actionman";

export type GlobalState = {
  theme: string;
};
type TypedActions = {
  setTheme: "dark" | "light";
};
type NonTypedActions = {};

const typed = typify<GlobalState, TypedActions, NonTypedActions>();

export const getGlobal = typed.getGlobal;
export const addActionHandler = typed.addActionHandler;
export const useGlobal = typed.useGlobal;
export const dispatch = typed.dispatch;
export const getActions = typed.getActions;
export const withGlobal = typed.withGlobal;
export const GlobalProvider = typed.GlobalProvider;
