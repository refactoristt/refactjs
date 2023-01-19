import { PropsWithChildren } from "react";

export const GLOBAL_DISPATCH_KEY = "global__dispatch";

export interface GlobalProviderProps<G = any> extends PropsWithChildren {
  initialState: G;
}
export type ActionNames = string;
export type ActionPayload = any;
export interface ActionOptions {}
export type ActionHandler<Global> = (
  global: Global,
  actions: Record<ActionNames, ActionHandler<Global>>,
  payload: ActionPayload
) => Global | void | Promise<void>;

export type NonTypedActionNames = {};
export type ActionPayloads<Global> = Record<string, ActionHandler<Global>>;

export type ActionFunc = (
  payload?: ActionPayload,
  options?: ActionOptions
) => void;
