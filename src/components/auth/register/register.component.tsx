import React, { FC } from "react";
import { getActions, GlobalState, withGlobal } from "../../../global";

type StateProps = Pick<GlobalState, "theme">;
type OwnProps = {};
type CombineProps = StateProps & OwnProps;
const RegisterComponent: FC<CombineProps> = ({ theme }) => {
  const onClick = () => {
    if (theme === "dark") {
      getActions().setTheme("light");
    }
    if (theme === "light") {
      getActions().setTheme("dark");
    }
  };
  return (
    <div>
      This is Register Component and Theme is
      <button onClick={() => onClick()}>Dispatch</button> {theme}
    </div>
  );
};

export default withGlobal<StateProps, OwnProps>(
  (global, ownProps): CombineProps => ({
    theme: global.theme,
    ...ownProps,
  })
)(RegisterComponent);
