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
type ActionNames = string;
type ActionPayload = any;
interface ActionOptions {}
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
