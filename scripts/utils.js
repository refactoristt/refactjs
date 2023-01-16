function printHelp() {
  console.log(
    `
    refact-cli [-h | --help] [--cc]

    🤩 Fantastic Cli For Refact.JS Member !

    Variables:

    🛠️Options:
    --help, -h               Print this help message

    ✏Component:
    --create-component,-cc   Create Component With (.component,.container,.async) and Bundle Export !
    `
  );
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

export {
  printHelp,
  showError,
  showInfoMessage,
};
