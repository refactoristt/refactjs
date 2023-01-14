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

export type Resolver = (
  global: GlobalContextType,
  actions: any,
  payload: any
) => GlobalContextType;

export const initialState: GlobalContextType = {
  setting: {
    theme: ThemeEnum.Light,
  },
};
