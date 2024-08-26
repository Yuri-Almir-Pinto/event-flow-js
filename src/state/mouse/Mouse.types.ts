import { ButtonState, IBaseEvent, IBaseInfo } from "../State.types";

export enum WheelState {
    Up = "up", Down = "down", Stationary = "stationary"
}

export interface IMousePositionEvent { 
    clientX: number, clientY: number, offsetX: number, offsetY: number, pageX: number, pageY: number, screenX: number,
    screenY: number
}

export interface IWheelDirectionEvent {
    deltaY: number
}

export interface IMouseButtonClicked {
    button: number
}

export interface IMouseEvent extends IBaseEvent, IMousePositionEvent, IMouseButtonClicked {}
export interface IWheelEvent extends IMouseEvent, IWheelDirectionEvent {}

export interface IPosition extends IMousePositionEvent {}

export interface IMouseState extends IPosition, IBaseInfo {
    left: ButtonState
    right: ButtonState
    middle: ButtonState
    wheel: WheelState
}
