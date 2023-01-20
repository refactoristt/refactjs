import type { FC } from "react";
import React from "react";
import { RegisterAsync } from "./components/auth/register/register.async";
import { GlobalProvider, GlobalState } from "./global";
import { INITIAL_STATE } from "./global/initialState";

import "./global/actions/all";

type StateProps = {};
const App: FC<StateProps> = ({}) => {
  return (
    <GlobalProvider<GlobalState> debug initialState={INITIAL_STATE}>
      <RegisterAsync />;
    </GlobalProvider>
  );
};

export default App;
