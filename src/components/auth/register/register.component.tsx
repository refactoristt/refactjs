import React from "react";
import { dispatch, getGlobal } from "../../../global";
import { withGlobal } from "../../../global/global.hoc";
import { ThemeEnum } from "../../../global/global.types";

type StateProps = { theme: ThemeEnum };
type OwnProps = {};
type CombineProps = StateProps & OwnProps;
const RegisterComponent = ({ theme }: CombineProps) => {
  const onClick = () => {
    if (theme === ThemeEnum.Dark) {
      dispatch("SET_THEME", "LIGHT");
    }
    if (theme === ThemeEnum.Light) {
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

export default withGlobal<StateProps, OwnProps>(
  (global, ownProps): CombineProps => ({
    theme: global.setting.theme,
    ...ownProps,
  })
)(RegisterComponent);
