import React, { FC } from "react";
import {
  getActions,
  GlobalState,
  withGlobal,
  dispatch,
  useGlobal,
} from "../../../global";

type StateProps = Pick<GlobalState, "theme"> & any;
type OwnProps = {};
type CombineProps = StateProps & OwnProps;
const RegisterComponent: FC<CombineProps> = ({ theme, global }) => {
  const myGlobal = useGlobal();
  console.log(myGlobal);
  const onClick = (theme: string) => {
    dispatch("setTheme", theme);
    getActions().setTheme(theme as any);
  };
  return (
    <div>
      This is Register Component and Theme is {theme}
      <br />
      <button onClick={() => onClick("dark")}>Dark</button> {theme}
      <button onClick={() => onClick("light")}>Light</button> {theme}
    </div>
  );
};

export default withGlobal<StateProps, OwnProps>(
  (global, ownProps): CombineProps => ({
    // theme: global.theme,
    global,
    ...ownProps,
  })
)(RegisterComponent);
