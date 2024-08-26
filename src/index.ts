import { KeyboardKey } from "./state/State.types";
import { EventFlow } from "./state/EventFlow";
import { IMouseState, WheelState } from "./state/mouse/Mouse.types";
import { ButtonState } from "./state/State.types";
import { IKeyboardState } from "./state/keyboard/Keyboard.types";

const inputState = new EventFlow();
const point = document.createElement("div");
point.id = "point"
point.style.width = "50px";
point.style.height = "50px";
point.style.borderRadius = "100%";
point.style.backgroundColor = "red";
point.style.position = "relative";
document.body.appendChild(point);

inputState.init()
inputState.on(myStuff);

function myStuff(mouse: Readonly<IMouseState>, keyboard: Readonly<IKeyboardState>) {

    if (keyboard.codes.get(KeyboardKey.KeyC) === ButtonState.Held && mouse.left === ButtonState.Pressed) {
        if (mouse.target.id === "point") {
            point.style.backgroundColor = point.style.backgroundColor === "black" ? "red" : "black";
        }
            
    }
}