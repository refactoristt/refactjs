import "./util/handleError";
import "./util/setupServiceWorker";

import React from "react";
import DOM from "react-dom";

import "./global";

import App from "./App";
import { DEBUG } from "./config";
import { Logger } from "./util/log";
import { $getGlobal } from "./global/global.module";

DOM.render(<App />, document.getElementById("root")!);

if (DEBUG) {
  document.addEventListener("dblclick", (e) => {
    Logger.D($getGlobal());
  });
}
