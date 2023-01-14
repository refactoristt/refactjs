import React, { FC } from "react";
import { RegisterComponent } from "./register.component";
import { useGlobal } from "../../../global";

type Props = {};
const RegisterContainer: FC<Props> = (props) => {
  const globalState = useGlobal();
  return <RegisterComponent theme={globalState.setting.theme} />;
};

export default RegisterContainer;
