import React from "react";
import { dispatch, getGlobal } from "../../../global";
import { withGlobal } from "../../../global/global.hoc";
import { GlobalContextType } from "../../../global/global.types";

type Props = {} & GlobalContextType;
const RegisterComponent = ({ setting: { theme } }: Props) => {
  const onClick = () => {
    if (theme === "DARK") {
      dispatch("SET_THEME", "LIGHT");
    }
    if (theme === "LIGHT") {
      dispatch("SET_THEME", "DARK");
    }
    setTimeout(() => {
      console.log(getGlobal());
    }, 2000);
  };
  return (
    <div>
      This is Register Component and Theme is
      <button onClick={() => onClick()}>Dispatch</button> {theme}
    </div>
  );
};

export default withGlobal(RegisterComponent);
