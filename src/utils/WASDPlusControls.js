
import AFRAME from "aframe";
const THREE = AFRAME.THREE;
const bind = AFRAME.utils.bind;
const shouldCaptureKeyEvent = AFRAME.utils.shouldCaptureKeyEvent;

const KEYS = [
    "KeyW", "KeyA", "KeyS", "KeyD",
    "ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown",
    "Space", "ShiftLeft", "ShiftRight"
];

const MAX_DELTA = 0.25;
const CLAMP_VELOCITY = 0.01;
const MOD_Y = 1.5;

/**
 * Check if the object is empty or not
 * 
 * @param {object} keys 
 */
const isEmptyObject = (keys) => {
    let key;
    for (key in keys) { return false; }
    return true;
};


/**
 * @summary Add space and shift controls to the movement
 */
AFRAME.registerComponent("wasd-plus-controls", {
    schema: {
        acceleration: {type: "number", default : 150},
        enabled : {type: "boolean", default : true},
        xInverted : {type: "boolean", default : false},
        yInverted : {type: "boolean", default : false},
        zInverted : {type: "boolean", default : false},
    },
    init: function() {
        //tracks the state of keypresses
        this.keys = {};
        this.easing = 1.1;
        this.velocity = new THREE.Vector3();
    
        this.onBlur = bind(this.onBlur, this);
        this.onFocus = bind(this.onFocus, this);
        this.onKeyDown = bind(this.onKeyDown, this);
        this.onKeyUp = bind(this.onKeyUp, this);
        this.onVisibilityChange = bind(this.onVisibilityChange, this);
        this.attachVisibilityEventListeners();
    },

    tick: function (time, delta) {
        let el = this.el;
        let velocity = this.velocity;

        if (!velocity["x"] && !velocity["y"] && !velocity["z"] && isEmptyObject(this.keys)) { return; }

        // Update velocity.
        delta = delta / 1000;
        this.updateVelocity(delta);
    
        if (!velocity["x"] && !velocity["y"] && !velocity["z"]) { return; }
    
        // Get movement vector and translate position.
        el.object3D.position.add(this.getMovementVector(delta));
    },

    remove: function () {
        this.removeKeyEventListeners();
        this.removeVisibilityEventListeners();
    },
    
    play: function () {
        this.attachKeyEventListeners();
    },
    
    pause: function () {
        this.keys = {};
        this.removeKeyEventListeners();
    },

    updateVelocity: function (delta) {
        let data = this.data;
        let keys = this.keys;
        let velocity = this.velocity;
        let acceleration;
        let xSign;
        let ySign;
        let zSign;

        // If FPS too low, reset velocity.
        if (delta > MAX_DELTA) {
            velocity["x"] = 0;
            velocity["y"] = 0;
            velocity["z"] = 0;
            return;
        }
        // https://gamedev.stackexchange.com/questions/151383/frame-rate-independant-movement-with-acceleration
        let scaledEasing = Math.pow(1 / this.easing, delta * 60);
        // Velocity Easing based on framerate
        if (velocity["x"] !== 0) {
            velocity["x"] -= velocity["x"] * scaledEasing;
        }
        if (velocity["y"] !== 0) {
            velocity["y"] -= velocity["y"] * scaledEasing;
        }
        if (velocity["z"] !== 0) {
            velocity["z"] -= velocity["z"] * scaledEasing;
        }
    
        // Clamp velocity easing.
        if (Math.abs(velocity["x"]) < CLAMP_VELOCITY) { velocity["x"] = 0; }
        if (Math.abs(velocity["y"]) < CLAMP_VELOCITY) { velocity["y"] = 0; }
        if (Math.abs(velocity["z"]) < CLAMP_VELOCITY) { velocity["z"] = 0; }
    
        if (!data.enabled) { return; }
    
        // Update velocity using keys pressed.
        acceleration = data.acceleration;
        xSign = data.xInverted ? -1 : 1;
        if (keys.KeyA || keys.ArrowLeft) { velocity["x"] -= xSign * acceleration * delta; }
        if (keys.KeyD || keys.ArrowRight) { velocity["x"] += xSign * acceleration * delta; }

        ySign = data.yInverted ? -1 : 1;
        if (keys.ShiftLeft || keys.ShiftRight) { velocity["y"] -= ySign * acceleration * delta * MOD_Y; }
        if (keys.Space) { velocity["y"] += ySign * acceleration * delta * MOD_Y; }

        zSign = data.zInverted ? -1 : 1;
        if (keys.KeyW || keys.ArrowUp) { velocity["z"] -= zSign * acceleration * delta; }
        if (keys.KeyS || keys.ArrowDown) { velocity["z"] += zSign * acceleration * delta; }
    },

    getMovementVector: function (delta) {
        let directionVector = new THREE.Vector3(0, 0, 0);
        let rotationEuler = new THREE.Euler(0, 0, 0);
        let rotation = this.el.object3D.rotation;
        let velocity = this.velocity;

        directionVector.copy(velocity);
        directionVector.multiplyScalar(delta);

        // Absolute.
        if (!rotation) { return directionVector; }

        // Transform direction relative to heading.
        rotationEuler.set(0, rotation.y, 0);
        directionVector.applyEuler(rotationEuler);
        return directionVector;
    },

    attachVisibilityEventListeners: function () {
        window.addEventListener("blur", this.onBlur);
        window.addEventListener("focus", this.onFocus);
        document.addEventListener("visibilitychange", this.onVisibilityChange);
    },

    removeVisibilityEventListeners: function () {
        window.removeEventListener("blur", this.onBlur);
        window.removeEventListener("focus", this.onFocus);
        document.removeEventListener("visibilitychange", this.onVisibilityChange);
    },

    attachKeyEventListeners: function () {
        window.addEventListener("keydown", this.onKeyDown);
        window.addEventListener("keyup", this.onKeyUp);
    },
    
    removeKeyEventListeners: function () {
        window.removeEventListener("keydown", this.onKeyDown);
        window.removeEventListener("keyup", this.onKeyUp);
    },
    
    onBlur: function () {
        this.pause();
    },
    
    onFocus: function () {
        this.play();
    },
    
    onVisibilityChange: function () {
        if (document.hidden) {
            this.onBlur();
        } else {
            this.onFocus();
        }
    },
    
    onKeyDown: function (event) {
        if (!shouldCaptureKeyEvent(event)) { return; }
        let code = event.code;
        if (KEYS.includes(code)) { this.keys[code] = true; }
    },
    
    onKeyUp: function (event) {
        if (!shouldCaptureKeyEvent(event)) { return; }
        let code = event.code;
        delete this.keys[code];
    }
});