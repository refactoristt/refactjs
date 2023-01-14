import type { FC } from "react";
import React from "react";
import { RegisterAsync } from "./components/auth/register/register.async";
import { GlobalProviderProps, ThemeProvider } from "./global";

const reducers: GlobalProviderProps["reducers"] = {
  SET_THEME: (global, actions, payload) => {
    return {
      ...global,
      setting: {
        ...global.setting,
        theme: payload,
      },
    };
  },
};

type StateProps = {};
const App: FC<StateProps> = ({}) => {
  return (
    <ThemeProvider reducers={reducers}>
      <RegisterAsync />;
    </ThemeProvider>
  );
};

export default App;
