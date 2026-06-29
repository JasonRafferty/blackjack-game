import { dealButtonHandler, doubleDown, hit, lower, raise, stick } from "./game.js";
import { bindControls } from "./ui.js";

document.body.style.backgroundImage = `url('${import.meta.env.BASE_URL}Images/background.jpg')`;

bindControls({
  deal: dealButtonHandler,
  double: doubleDown,
  hit,
  lower,
  raise,
  stick,
});
