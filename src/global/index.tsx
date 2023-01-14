import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  GLOBAL_DISPATCH_KEY,
  GlobalContextType,
  GlobalProviderProps,
  initialState,
  Resolver,
} from "./types";

let currentGlobal = initialState;
const actionHandlers: Record<string, Resolver> = {};

const GlobalContext = createContext<GlobalContextType>(initialState);

export const GlobalProvider: FC<PropsWithChildren<GlobalProviderProps>> = ({
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
    document.addEventListener(GLOBAL_DISPATCH_KEY, onDispatch as AnyFunction);

    return () => {
      document.removeEventListener(GLOBAL_DISPATCH_KEY, () => {});
    };
  }, []);

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const theme = useContext(GlobalContext);

  if (!theme)
    throw new Error("You must use theme hook as a child of theme provider");

  return theme;
};

export const getGlobal = () => currentGlobal;

export const dispatch = (action: string, payload: any) => {
  document.dispatchEvent(
    new CustomEvent(GLOBAL_DISPATCH_KEY, {
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
