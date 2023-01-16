#!/usr/bin/env node

import minimist from "minimist";

import main from "./main.js";
import { printHelp, showError } from "./utils.js";

const args = minimist(process.argv.slice(2), {
  default: {
  },
});

if (args.h || args.help) {
  printHelp();
  process.exit(0);
}

(async () => {
  try {
    await main(args);
  } catch (e) {
    showError(`Something went wrong!\n\n${e.message}\n\n ${e}`);
    process.exit(1);
  }
})();
