import "./util/handleError";
import "./util/setupServiceWorker";

import React from "react";
import DOM from "react-dom";

import "./global";

import App from "./App";
DOM.render(<App />, document.getElementById("root")!);
