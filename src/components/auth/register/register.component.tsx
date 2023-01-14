import * as React from "react";
import { dispatch } from "../../../global";

type Props = {
  theme: string;
};
export const RegisterComponent = (props: Props) => {
  const onClick = () => {
    if (props.theme === "DARK") {
      dispatch("SET_THEME", "LIGHT");
    }
    if (props.theme === "LIGHT") {
      dispatch("SET_THEME", "DARK");
    }
  };
  return (
    <div>
      This is Register Component and Theme is
      <button onClick={() => onClick()}>Dispatch</button> {props.theme}
    </div>
  );
};
