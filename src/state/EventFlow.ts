import { KeyboardEventType, MouseEventType } from "../EventEnums.types";
import { asReadonly } from "../proxy/ReadonlyProxy";
import { KeyboardState } from "./keyboard/KeyboardState";
import { sanitizeEvent } from "./General.updates";
import { MouseState } from "./mouse/MouseState";
import { EventFunction, GeneralEvent } from "./State.types";
import { updateMouseState } from "./mouse/Mouse.updates";
import { updateKeyboardState } from "./keyboard/Keyboard.updates";
import { singleKeyAction } from "./General.functions";

export class EventFlow {
    #isLooping: boolean = false;
    mouse: MouseState = new MouseState();
    keyboard: KeyboardState = new KeyboardState();

    #toCallFunctions: EventFunction[] = [];

    init() {
        const inputState = this;
        window.removeEventListener(MouseEventType.MouseUp, eventMountFunc);
        window.removeEventListener(MouseEventType.MouseDown, eventMountFunc);
        window.removeEventListener(MouseEventType.MouseMove, eventMountFunc);
        window.removeEventListener(MouseEventType.Wheel, eventMountFunc);
        window.removeEventListener(KeyboardEventType.KeyDown, singleKeyAction(eventMountFunc, KeyboardEventType.KeyDown));
        window.removeEventListener(KeyboardEventType.KeyUp, singleKeyAction(eventMountFunc, KeyboardEventType.KeyUp));

        window.addEventListener(MouseEventType.MouseUp, eventMountFunc);
        window.addEventListener(MouseEventType.MouseDown, eventMountFunc);
        window.addEventListener(MouseEventType.MouseMove, eventMountFunc);
        window.addEventListener(MouseEventType.Wheel, eventMountFunc);
        window.addEventListener(KeyboardEventType.KeyDown, singleKeyAction(eventMountFunc, KeyboardEventType.KeyDown));
        window.addEventListener(KeyboardEventType.KeyUp, singleKeyAction(eventMountFunc, KeyboardEventType.KeyUp));

        this.#startLoop();

        function eventMountFunc(event: MouseEvent | WheelEvent | KeyboardEvent) {
            inputState.#update(event);
        }
    }

    on(func: EventFunction) {
        this.#toCallFunctions.push(func);
    }

    #update(event: GeneralEvent) {
        const sanitized = sanitizeEvent(event);
        updateMouseState(this.mouse, sanitized);
        updateKeyboardState(this.keyboard, sanitized);

        for (let func of this.#toCallFunctions) {
            func(asReadonly(this.mouse), asReadonly(this.keyboard));
        }
    }

    #startLoop() {
        if (this.#isLooping === false) {
            this.#isLooping = true;

            const owner = this;

            const loop = () => {
                if (owner.#isLooping === false) return;

                this.#update(null);
                requestAnimationFrame(loop);
            };

            requestAnimationFrame(loop);
        }
    }

    #stopLoop() {
        this.#isLooping = false;
    }
}