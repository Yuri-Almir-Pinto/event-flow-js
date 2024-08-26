import { ButtonState } from "../State.types";
import { IMouseState, WheelState } from "./Mouse.types";

export class MouseState implements IMouseState {
    left: ButtonState = ButtonState.None;
    right: ButtonState = ButtonState.None;
    middle: ButtonState = ButtonState.None;
    wheel: WheelState = WheelState.Stationary;

    clientX: number = -1;
    clientY: number = -1;
    offsetX: number = -1;
    offsetY: number = -1;
    pageX: number = -1;
    pageY: number = -1;
    screenX: number = -1;
    screenY: number = -1;

    timestamp: number = -1;
    target: Element = document.documentElement;
}

