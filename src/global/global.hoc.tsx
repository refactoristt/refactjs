import React from "react";
import { GlobalContextType } from "./global.types";
import { useGlobal } from "./index";

export function $withGlobal<
  StateProps extends AnyLiteral,
  OwnProps = AnyLiteral
>(
  cb: (global: GlobalContextType, ownProps: OwnProps) => StateProps & OwnProps
) {
  return (WrappedComponent: React.ComponentType<OwnProps & StateProps>) => {
    const displayName =
      WrappedComponent.displayName || WrappedComponent.name || "Component";

    const ComponentWithTheme = (props: OwnProps) => {
      const useGlobalProps = useGlobal();
      const finalProps = cb(useGlobalProps, props as OwnProps);

      return <WrappedComponent {...(finalProps as StateProps & OwnProps)} />;
    };

    ComponentWithTheme.displayName = `withGlobal(${displayName})`;

    return ComponentWithTheme;
  };
}
