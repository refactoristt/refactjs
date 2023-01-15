import type { FC } from "react";
import React from "react";
import { RegisterAsync } from "./components/auth/register/register.async";
import { GlobalProvider } from "./global/global.module";
import { addActionHandler } from "./global";
import { GlobalContextType } from "./global/global.types";
import { INITIAL_STATE } from "./global/global.initial";

addActionHandler("setTheme", (global, actions, payload) => {
  return {
    ...global,
    setting: {
      theme: payload,
    },
  };
});

type StateProps = {};
const App: FC<StateProps> = ({}) => {
  return (
    <GlobalProvider<GlobalContextType> initialState={INITIAL_STATE}>
      <RegisterAsync />;
    </GlobalProvider>
  );
};

export default App;
