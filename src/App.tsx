import type { FC } from "react";
import React from "react";
import { RegisterAsync } from "./components/auth/register/register.async";

type StateProps = {};
const App: FC<StateProps> = ({}) => {
  return <RegisterAsync />;
};

export default App;
