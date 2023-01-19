import { addActionHandler } from "../index";

addActionHandler("setTheme", (global, actions, payload) => {
  return {
    ...global,
    theme: payload,
  };
});
