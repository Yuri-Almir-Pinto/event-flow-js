import { IKeyboardEvent } from "./keyboard/Keyboard.types";
import { IMouseEvent, IWheelEvent } from "./mouse/Mouse.types";
import { IBaseEvent, IBaseInfo } from "./State.types";

export function updateBaseInfo(base: IBaseInfo, event: IBaseEvent) {
    base.target = event.target;
    base.timestamp = Date.now();
}

export function sanitizeEvent(
    event: MouseEvent | WheelEvent | KeyboardEvent | null
): IMouseEvent | IWheelEvent | IKeyboardEvent | null {
    if (event === null) return null;
    if (!(event.target instanceof Element)) return null;

    return event as MouseEvent & { target: Element; };
}
