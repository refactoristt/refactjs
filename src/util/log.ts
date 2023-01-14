type Args = any;
export class Logger {
  //Error
  static E(...args: Args) {
    console.error("[☸Refact Error]", ...args);
  }

  //Warning
  static W(...args: Args) {
    console.warn("[☸Refact Warning]", ...args);
  }

  //Debug
  static D(...args: Args) {
    console.debug("[☸Refact Debug]", ...args);
  }

  //Log
  static L(...args: Args) {
    console.log("[☸Refact]", ...args);
  }
}
