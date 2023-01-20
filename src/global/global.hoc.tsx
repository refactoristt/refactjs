import React from "react";
import { useGlobal } from "./index";

export function $withGlobal<
  StateProps extends Object,
  OwnProps = Object,
  Global = unknown
>(cb: (global: Global, ownProps: OwnProps) => StateProps & OwnProps) {
  return (WrappedComponent: React.ComponentType<OwnProps & StateProps>) => {
    const displayName =
      WrappedComponent.displayName || WrappedComponent.name || "Component";

    const ComponentWithTheme = (props: OwnProps) => {
      const useGlobalProps = useGlobal<Global>();
      const cbResult = cb(useGlobalProps, props as OwnProps);
      const finalProps = { ...props, ...cbResult };

      return <WrappedComponent {...(finalProps as StateProps & OwnProps)} />;
    };

    ComponentWithTheme.displayName = `withGlobal(${displayName})`;

    return ComponentWithTheme;
  };
}
