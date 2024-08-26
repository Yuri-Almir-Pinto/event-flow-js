import { ButtonState } from "../State.types";
import { CodeMap, IKeyboardState, INoUndefinedMap, KeyMap } from "./Keyboard.types";

export class KeyboardState implements IKeyboardState {
    keys: KeyMap = new NoUndefinedMap(ButtonState.None);
    codes: CodeMap = new NoUndefinedMap(ButtonState.None);

    timestamp: number = -1;
    target: Element = document.documentElement;
}

export class NoUndefinedMap<K, V> extends Map<K, V> implements INoUndefinedMap<K, V> {
    #blueprint: V

    constructor(blueprint: V) {
        super();
        this.#blueprint = blueprint;
    }

    get(key: K): V {
        let value = super.get(key);

        if (value !== undefined) return value;

        if (typeof this.#blueprint === "object" && this.#blueprint !== null) {
            const copy = {...this.#blueprint};
            this.set(key, copy);
            return copy
        }
        else {
            this.set(key, this.#blueprint);
            return this.#blueprint;
        }   
    }
}