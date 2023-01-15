import React from "react";
import { GlobalContextType } from "./global.types";
import { useGlobal } from "./index";

type WithGlobalProps = GlobalContextType;

export function withGlobal<T extends WithGlobalProps = WithGlobalProps>(
  WrappedComponent: React.ComponentType<T>
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithTheme = (props: Omit<T, keyof WithGlobalProps>) => {
    const useGlobalProps = useGlobal();

    return <WrappedComponent {...useGlobalProps} {...(props as T)} />;
  };

  ComponentWithTheme.displayName = `withGlobal(${displayName})`;

  return ComponentWithTheme;
}
