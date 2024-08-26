import { KeyboardEventType } from "../../EventEnums.types";
import { updateBaseInfo } from "../General.updates";
import { ButtonState, GeneralEventSanitized, KeyboardKey } from "../State.types";
import { IKeyboardEvent, IKeyboardState } from "./Keyboard.types";

export function updateKeyboardState(keyboard: IKeyboardState, event: GeneralEventSanitized) {
    if (event !== null)
        updateBaseInfo(keyboard, event);

    let code: string | undefined;
    let key: string | undefined;

    if (event !== null && !("clientX" in event)) {
        code = event.code;
        key = event.key;
    }

    keyboard.codes.forEach((value, key, map) => updateKeys(value, key, map, code));
    keyboard.keys.forEach((value, key, map) => updateKeys(value, key, map, key));

    function updateKeys(
        value: ButtonState, 
        key: string | KeyboardKey, 
        map: Map<string | KeyboardKey, ButtonState>, 
        keyCode: string | KeyboardKey | undefined
    ) {
        const toChange = value === ButtonState.Pressed ? ButtonState.Held 
            : value === ButtonState.Released ? ButtonState.None 
            : value;

        map.set(key, toChange);

        if (event === null) return;

        switch(true) {
            case event.type === KeyboardEventType.KeyDown && keyCode === key:
                map.set(key, ButtonState.Pressed);
                break;
            case event.type === KeyboardEventType.KeyUp && keyCode === key:
                map.set(key, ButtonState.Released);
                break;
        }
    }
}