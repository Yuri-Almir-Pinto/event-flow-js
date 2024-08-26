import { ButtonState, IBaseEvent, IBaseInfo, KeyboardKey } from "../State.types";

export interface IKeyboardEvent extends IBaseEvent {
    key: string
    code: string
}

export interface IKeyboardState extends IBaseInfo {
    keys: KeyMap
    codes: CodeMap
}

export interface INoUndefinedMap<K, V> extends Map<K, V> {
    get(K: K): V
}

export type KeyMap = INoUndefinedMap<string, ButtonState>;
export type CodeMap = INoUndefinedMap<KeyboardKey | string, ButtonState>;