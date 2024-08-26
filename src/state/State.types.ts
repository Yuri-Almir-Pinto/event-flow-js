import { IKeyboardEvent, IKeyboardState } from "./keyboard/Keyboard.types"
import { IMouseEvent, IMouseState, IWheelEvent } from "./mouse/Mouse.types"

export enum ButtonState {
    Pressed = "pressed", Held = "held", Released = "released", None = "None"
}

export interface IBaseEvent {
    target: Element
    type: string
}

export interface IBaseInfo {
    timestamp: number
    target: Element
}

export type GeneralEvent = MouseEvent | WheelEvent | KeyboardEvent | null;
export type GeneralEventSanitized = IMouseEvent | IWheelEvent | IKeyboardEvent | null

export type EventFunction = (mouse: Readonly<IMouseState>, keyboard: Readonly<IKeyboardState>) => void;

export enum KeyboardKey {
    KeyA = "KeyA", KeyB = "KeyB", KeyC = "KeyC", KeyD = "KeyD", KeyE = "KeyE", KeyF = "KeyF", KeyG = "KeyG", KeyH = "KeyH",
    KeyI = "KeyI", KeyJ = "KeyJ", KeyK = "KeyK", KeyL = "KeyL", KeyM = "KeyM", KeyN = "KeyN", KeyO = "KeyO", KeyP = "KeyP",
    KeyQ = "KeyQ", KeyR = "KeyR", KeyS = "KeyS", KeyT = "KeyT", KeyU = "KeyU", KeyV = "KeyV", KeyW = "KeyW", KeyX = "KeyX",
    KeyY = "KeyY", KeyZ = "KeyZ"
}
