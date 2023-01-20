import React, { FC } from "react";
import RegisterComponent from "./register.component";
import { withGlobal } from "../../../global";

type Props = {};
const RegisterContainer: FC<Props> = (props) => {
  console.log("FFF ", props);
  return <RegisterComponent />;
};

export default withGlobal((global, ownProps) => ({
  ...global,
  ...ownProps,
}))(RegisterContainer);
