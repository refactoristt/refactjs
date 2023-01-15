import React from "react";
import { GlobalContextType } from "./global.types";
import { useGlobal } from "./index";

type WithGlobalProps = GlobalContextType;

export function withGlobal<T extends AnyLiteral, O = AnyLiteral>(
  cb: (global: GlobalContextType, ownProps: O) => any
) {
  return (WrappedComponent: React.ComponentType<T & O>) => {
    const displayName =
      WrappedComponent.displayName || WrappedComponent.name || "Component";

    const ComponentWithTheme = (props: Omit<T, keyof WithGlobalProps>) => {
      const useGlobalProps = useGlobal();
      const finalProps = cb(useGlobalProps, props as O);

      return <WrappedComponent {...(finalProps as T & O)} />;
    };

    ComponentWithTheme.displayName = `withGlobal(${displayName})`;

    return ComponentWithTheme;
  };
}
