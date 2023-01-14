import React from "react";
import useModuleLoader from "../../../hooks/useModuleLoader";
import { Bundles } from "../../../util/moduleLoader";

type Props = {};
export const RegisterAsync = (props: Props) => {
  const RegisterContainer = useModuleLoader(Bundles.Auth, "Register");

  return RegisterContainer ? (
    <RegisterContainer />
  ) : (
    <div>"Loading Register..."</div>
  );
};
