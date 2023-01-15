import React, { FC } from "react";
import { dispatch, getActions, getGlobal } from "../../../global";
import { withGlobal } from "../../../global/global.hoc";
import { ThemeEnum } from "../../../global/global.types";

type StateProps = { theme: ThemeEnum };
type OwnProps = {};
type CombineProps = StateProps & OwnProps;
const RegisterComponent: FC<CombineProps> = ({ theme }) => {
  const onClick = () => {
    if (theme === ThemeEnum.Dark) {
      getActions().setTheme(ThemeEnum.Light);
    }
    if (theme === ThemeEnum.Light) {
      getActions().setTheme(ThemeEnum.Dark);
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
