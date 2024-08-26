import { KeyboardEventType } from "../EventEnums.types";

const keysDown = new Map<string, boolean>();

export function singleKeyAction(callback: (event: KeyboardEvent) => void, type: KeyboardEventType) {
    if (type === KeyboardEventType.KeyDown) {
        return downHandler
    }
    else {
        return upHandler
    }

    function upHandler(event: KeyboardEvent) {
        keysDown.delete(event.key);
        callback(event);
    }

    function downHandler(event: KeyboardEvent) {
        if (keysDown.get(event.key) === undefined) {
            keysDown.set(event.key, true);
            callback(event);
        }
    }
}