import React, { FC } from "react";
import RegisterComponent from "./register.component";
import { useGlobal } from "../../../global";

type Props = {};
const RegisterContainer: FC<Props> = (props) => {
  return <RegisterComponent />;
};

export default RegisterContainer;
