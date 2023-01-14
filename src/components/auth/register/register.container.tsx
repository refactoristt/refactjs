import React, { FC } from "react";
import { RegisterComponent } from "./register.component";
import { useTheme } from "../../../global";

type Props = {};
const RegisterContainer: FC<Props> = (props) => {
  const globalState = useTheme();
  return <RegisterComponent theme={globalState.setting.theme} />;
};

export default RegisterContainer;
