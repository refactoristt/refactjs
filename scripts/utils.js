#!/usr/bin/env node

import emoji from "node-emoji";
import Table from "cli-table3";
import Chalk from "chalk";

function printHelp() {
  const commandTable = new Table({
    head: ["Command", "Description"],
    colWidths: [20, 50],
  });
  commandTable.push(
    ["-help --h", "display help and command lists of refact.js cli"],
    [
      "-create-component --cc",
      "Create Component With (.component,.container,.async) and Bundle Export !",
    ]
  );

  console.info(
    "Drink Your Coffe its first of Refact.JS !!! ",
    emoji.get(`coffe`),
    "\n",
    Chalk.bgBlue("Hello and Welcome to Refact.js"),
    `\nawesome cli For ${Chalk.blue("Refact.JS")} Member`
  );
  console.log(commandTable.toString());
}

function showError(reason, options = {}) {
  const { withHelp = false } = options;

  console.error("\x1b[31m%s\x1b[0m", reason);

  if (withHelp) {
    printHelp();
  }
}

function showInfoMessage(msg) {
  console.log("\x1b[36m%s\x1b[0m", msg);
}

export { printHelp, showError, showInfoMessage };
