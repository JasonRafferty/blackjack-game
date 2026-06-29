import { dealButtonHandler, hit, lower, raise, stick } from "./game.js";
import { bindControls } from "./ui.js";

bindControls({
  deal: dealButtonHandler,
  hit,
  lower,
  raise,
  stick,
});
