import { MouseButtons, MouseEventType } from "../../EventEnums.types";
import { updateBaseInfo } from "../General.updates";
import { ButtonState, GeneralEventSanitized } from "../State.types";
import { IMouseEvent, IMousePositionEvent, IPosition, IWheelEvent, WheelState } from "./Mouse.types";
import { MouseState } from "./MouseState";

export function updateMouseState(mouse: MouseState, event: GeneralEventSanitized) {
    mouse.left = progressButtonState(mouse.left);
    mouse.middle = progressButtonState(mouse.middle);
    mouse.right = progressButtonState(mouse.right);
    mouse.wheel = WheelState.Stationary;

    if (event === null || "key" in event) return;

    updatePosition(mouse, event);
    updateBaseInfo(mouse, event);

    switch (event.button) {
        case MouseButtons.Left: 
            mouse.left = updateButtonStateFromEvent(event.type as MouseEventType, mouse.left);
            break;
        case MouseButtons.Right: 
            mouse.right = updateButtonStateFromEvent(event.type as MouseEventType, mouse.right);
            break;
        case MouseButtons.Middle: 
            mouse.middle = updateButtonStateFromEvent(event.type as MouseEventType, mouse.middle);
            break;
    }

    if ("deltaY" in event) {
        mouse.wheel = event.deltaY > 0 ? WheelState.Down : event.deltaY < 0 ? WheelState.Up : WheelState.Stationary;
    }
}

export function updatePosition(position: IPosition, mousePos: IMousePositionEvent) {
    position.clientX = mousePos.clientX;
    position.clientY = mousePos.clientY;
    position.offsetX = mousePos.offsetX;
    position.offsetY = mousePos.offsetY;
    position.pageX = mousePos.pageX;
    position.pageY = mousePos.pageY;
    position.screenX = mousePos.screenX;
    position.screenY = mousePos.screenY;
}

export function updateButtonStateFromEvent(type: MouseEventType, currentState: ButtonState): ButtonState {
    if (type === MouseEventType.MouseDown) return ButtonState.Pressed;
    if (type === MouseEventType.MouseUp) return ButtonState.Released;

    return currentState;
}

export function progressButtonState(button: ButtonState): ButtonState {
    return button === ButtonState.Pressed ? ButtonState.Held : 
        button === ButtonState.Released ? ButtonState.None : button;
}

