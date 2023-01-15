type Args = any;
export class Logger {
  //Error
  static E(...args: Args) {
    console.error("[☸Refact Error]", ...args);
  }

  //Warning
  static W(...args: Args) {
    console.warn("[☸Refact]", ...args);
  }

  //Debug
  static D(...args: Args) {
    console.debug("[☸Refact]", ...args);
  }

  //Log
  static L(...args: Args) {
    console.log("[☸Refact]", ...args);
  }
}
