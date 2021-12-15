"use strict";

/**
 * @class Manage input

    Overview: Input system manages all input states for the keyboard and mouse.
        All states are held until the update method is call, at which time the
        current states are set to the pending state. This is to control the
        timing and debouncing if keys.

        Clients must register the keyboard keys desired to track, however, mouse
        events are automatically registered.
*/
class InputSystem {
    constructor() {
        this.registeredEvents = new Map();
        this.registeredEvents.set("mouseMove", {cur: 0, prev: 0, state: 0});
        this.registeredEvents.set("mouseLeft", {cur: 0, prev: 0, state: 0});
        this.registeredEvents.set("mouseMiddle", {cur: 0, prev: 0, state: 0});
        this.registeredEvents.set("mouseRight", {cur: 0, prev: 0, state: 0});

        document.addEventListener("keydown", InputSystem.keyDownHandler, false);
        document.addEventListener("keyup", InputSystem.keyUpHandler, false);
        document.addEventListener("mousemove", InputSystem.mouseMoveHandler, false);
        document.addEventListener("mousedown", InputSystem.mouseDownHandler, false);
        document.addEventListener("mouseup", InputSystem.mouseUpHandler, false);
    }
  
    /**
     * @private
     * @param {object} e - Event related to mouse movement
     * @param {number} e.client.x - Mouse move client x pixel location
     */
    static mouseMoveHandler(e) {
        let eventValues = inputSys.registeredEvents.get("mouseMove");
        if (eventValues != undefined) {
            eventValues.state = e.clientX;
        }
    }

    /**
     * @private
     * @param {object} e - Event related to mouse button press
     * @param {string} e.button - Identifes button that was pressed
     */
    static mouseDownHandler(e) {
        let eventValues = undefined;
        switch (e.button) {
            case 0:
            eventValues = inputSys.registeredEvents.get("mouseLeft");
            break;
        case 1:
            eventValues = inputSys.registeredEvents.get("mouseMiddle");
            break;
        case 2:
            eventValues = inputSys.registeredEvents.get("mouseRight");
            break;
        }

        if (eventValues != undefined) {
            eventValues.state = 1;
        }
    }

    /**
     * @private
     * @param {object} e - Event related to mouse button release
     * @param {string} e.button - Identifies button that was released
     */
    static mouseUpHandler(e) {
        let eventValues = undefined;
        switch (e.button) {
            case 0:
                eventValues = inputSys.registeredEvents.get("mouseLeft");
                break;
            case 1:
                eventValues = inputSys.registeredEvents.get("mouseMiddle");
                break;
            case 2:
                eventValues = inputSys.registeredEvents.get("mouseRight");
                break;
        }

        if (eventValues != undefined) {
            eventValues.state = 0;
        }
    }

    /**
     * @private
     * @param {object} e - Event related to a keyboard key press
     * @param {string} e.key - Identifies the key that was pressed
     */
    static keyDownHandler(e) {
        let eventValues = inputSys.registeredEvents.get(e.key);
        if (eventValues != undefined) {
            eventValues.state = 1;
        }
    }
  
    /**
     * @private
     * @param {object} e - Event related to a keyboard key release
     * @param {string} e.key - Identifies the key that was released
     */
     static keyUpHandler(e) {
        let eventValues = inputSys.registeredEvents.get(e.key);
        if (eventValues != undefined) {
            eventValues.state = 0;
        }
    }

    /**
     * @public
     * @param {string} buttonName - Identifes the name of the mouse button to check
     * @returns {boolean} - True if the mouse button is pressed
     */
    isMousePressed(buttonName) {
        let keyValues = this.registeredEvents.get(buttonName);
        if (keyValues != undefined) {
            return (keyValues.cur == 1);
        }
    }

    /**
     * @public
     * @param {string} buttonName - Identifes the name of the mouse button to check
     * @returns {boolean} - True if the mouse button was pressed
     */
    wasMousePressed(buttonName) {
        let keyValues = this.registeredEvents.get(buttonName);
        if (keyValues != undefined) {
            return (keyValues.prev == 1);
        }
    }

    /**
     * @public
     * @param {string} event - Name of key or mouse event to be registered
     */
    set registerEvent(event) {
        this.registeredEvents.set(event, {cur: 0, prev: 0, state: 0});
    }
    
    /**
     * @public
     */
    update() {
        for (let [key, values] of this.registeredEvents) {
            values.prev = values.cur;
            values.cur = values.state;
        }
    }
  
    /**
     * @public
     * @returns {number} - The x pixel location of the mouse
     */
    get mouseX() {
        let keyValues = this.registeredEvents.get("mouseMove");
        if (keyValues != undefined) {
            return keyValues.cur;
        }
    }

    /**
     * @public
     * @returns {boolean} - True if the left mouse button is currently pressed
     */
    get isMouseLeftPressed() {
        return this.isMousePressed("mouseLeft");
    }

    /**
     * @public
     * @returns {boolean} - True if the left mouse button was previously pressed
     */
    get wasMouseLeftPressed() {
        return this.wasMousePressed("mouseLeft");
    }

    /**
     * @public
     * @returns {boolean} - True if the middle mouse button is currently pressed
     */
    get isMouseMiddlePressed() {
        return this.isMousePressed("mouseMiddle");
    }

    /**
     * @public
     * @returns {boolean} - True if the middle mouse button was previously pressed
     */
    get wasMouseMiddlePressed() {
        return this.wasMousePressed("mouseMiddle");
    }

    /**
     * @public
     * @returns {boolean} - True if the right mouse button is currently pressed
     */
    get isMouseRightPressed() {
        return this.isMousePressed("mouseRight");
    }

    /**
     * @public
     * @returns {boolean} - True if the right mouse button was previously pressed
     */
    get wasMouseRightPressed() {
        return this.wasMousePressed("mouseRight");
    }

    /**
     * @public
     * @param {string} keyName - Name of key to check
     * @returns {boolean} - True if the keyboard key is currently pressed
     */
    isKeyPressed(keyName) {
        let keyValues = this.registeredEvents.get(keyName);
        if (keyValues != undefined) {
            return keyValues.cur == 1;
        }
    }
  
    /**
     * @public
     * @param {string} keyName - Name of key to check
     * @returns {boolean} - True if the keyboard key was prevoiusly pressed
     */
    wasKeyPressed(keyName) {
        let keyValues = this.registeredEvents.get(keyName);
        if (keyValues != undefined) {
            return keyValues.prev == 1;
        }
    }

    /**
     * @public
     * @param {string} keyName - Name of key to check
     * @returns {boolean} - True if the keyboard key is currently pressed
     */
    keyJustPressed(keyName) {
        let keyValues = this.registeredEvents.get(keyName);
        if (keyValues != undefined) {
            return (keyValues.cur == 1) && (keyValues.prev == 0);
        }
    }
  
    /**
     * @public
     * @param {string} keyName - Name of key to check
     * @returns {boolean} - True if the keyboard key is currently pressed
     */
    keyJustReleased(keyName) {
        let keyValues = this.registeredEvents.get(keyName);
        if (keyValues != undefined) {
            return (keyValues.prev == 1) && (keyValues.cur == 0);
        }
    }
}

let inputSys = new InputSystem();
export default inputSys; 