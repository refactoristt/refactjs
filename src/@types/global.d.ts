declare const process: NodeJS.Process;

declare module '*.module.scss';

declare const APP_REVISION: string;

declare namespace React {
  interface HTMLAttributes {
  }

  interface CSSProperties extends String {}

  interface Attributes {
  }

  interface MouseEvent {
    offsetX: number;
    offsetY: number;
  }

  interface KeyboardEvent {
    isComposing: boolean;
  }
}

type AnyLiteral = Record<string, any>;
type AnyClass = new (...args: any[]) => any;
type AnyFunction = (...args: any[]) => any;
type AnyToVoidFunction = (...args: any[]) => void;
type NoneToVoidFunction = () => void;
