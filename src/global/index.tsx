import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

enum ThemeEnum {
  Light = "LIGHT",
  Dark = "DARK",
}
type GlobalContextType = {
  setting: {
    theme: ThemeEnum;
  };
};
const initialState: GlobalContextType = {
  setting: {
    theme: ThemeEnum.Light,
  },
};
let currentGlobal = initialState;
type Resolver = (
  global: GlobalContextType,
  actions: any,
  payload: any
) => GlobalContextType;
const actionHandlers: Record<string, Resolver> = {};

const ThemeContext = createContext<GlobalContextType>(initialState);

export type GlobalProviderProps = {};
export const ThemeProvider: FC<PropsWithChildren<GlobalProviderProps>> = ({
  children,
}) => {
  const [globalState, setGlobalState] =
    useState<GlobalContextType>(initialState);

  const onDispatch = ({
    detail: { action, payload },
  }: CustomEvent<{
    payload: any;
    action: string;
  }>) => {
    const reducer = actionHandlers[action];
    const reducerResult = reducer(globalState, actionHandlers, payload);
    setGlobalState(reducerResult);
    currentGlobal = reducerResult;
  };
  useEffect(() => {
    document.addEventListener("dispatch", onDispatch as AnyFunction);

    return () => {
      document.removeEventListener("dispatch", () => {});
    };
  }, []);

  return (
    <ThemeContext.Provider value={globalState}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (!theme)
    throw new Error("You must use theme hook as a child of theme provider");

  return theme;
};

export const getGlobal = () => currentGlobal;

export const dispatch = (action: string, payload: any) => {
  document.dispatchEvent(
    new CustomEvent("dispatch", {
      detail: {
        action,
        payload,
      },
    })
  );
};

export const addActionHandler = (action: string, resolver: Resolver) => {
  actionHandlers[action] = resolver;
};
