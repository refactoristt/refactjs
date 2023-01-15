import { PropsWithChildren } from "react";

export const GLOBAL_DISPATCH_KEY = "global__dispatch";
export enum ThemeEnum {
  Light = "LIGHT",
  Dark = "DARK",
}
export type GlobalContextType = {
  setting: {
    theme: ThemeEnum;
  };
};
export interface GlobalProviderProps<G = any> extends PropsWithChildren {
  initialState: G;
}
export type ActionNames = string;
export type ActionPayload = any;
export interface ActionOptions {}
export type ActionHandler = (
  global: GlobalContextType,
  actions: Record<ActionNames, ActionHandler>,
  payload: ActionPayload
) => GlobalContextType | void | Promise<void>;

export type NonTypedActionNames = {};
export type ActionPayloads = Record<string, ActionHandler>;

export type ActionFunc = (
  payload?: ActionPayload,
  options?: ActionOptions
) => void;
