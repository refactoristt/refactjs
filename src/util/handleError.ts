import {Logger} from "./log";

window.addEventListener('error', handleErrorEvent);
window.addEventListener('unhandledrejection', handleErrorEvent);

// eslint-disable-next-line prefer-destructuring
const APP_ENV = process.env.APP_ENV;

function handleErrorEvent(e: ErrorEvent | PromiseRejectionEvent) {
  if (e instanceof ErrorEvent && e.message === 'ResizeObserver loop limit exceeded') {
    return;
  }

  e.preventDefault();

  handleError(e instanceof ErrorEvent ? (e.error || e.message) : e.reason);
}

const throttledAlert = Logger.E

export function handleError(err: Error) {
  // eslint-disable-next-line no-console
  console.error(err);

  if (APP_ENV === 'development' || APP_ENV === 'staging') {
    throttledAlert(`\n\n${(err?.message) || err}\n${err?.stack}`);
  }
}
