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
export type GlobalProviderProps = {};
export type ActionNames = string;
export type ActionPayload = any;
export interface ActionOptions {}
export type ActionHandler = (
  global: GlobalContextType,
  actions: Record<ActionNames, ActionHandler>,
  payload: ActionPayload
) => GlobalContextType | void | Promise<void>;

export const initialState: GlobalContextType = {
  setting: {
    theme: ThemeEnum.Light,
  },
};

export type NonTypedActionNames = {};
export type ActionPayloads = Record<string, ActionHandler>;

export type ActionFunc = (
  payload?: ActionPayload,
  options?: ActionOptions
) => void;
