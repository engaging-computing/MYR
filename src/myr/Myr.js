import "aframe";
import "aframe-physics-system";
import Group from "./Group";
import CANNON from "cannon";

class Myr {
    constructor(baseEls) {
        this.counter = 0;
        this.baseEls = baseEls;
        this.els = [];
        this.assets = [];
        this.res = { els: this.els, assets: this.assets };
        this.sceneEl = document.querySelector("a-scene");
        this.cursor = {
            color: "red",
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            scale: {
                x: 1,
                y: 1,
                z: 1
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            radius: "1",
            phiLength: 360,
            loop: true,
            duration: 1000,
            magnitude: {
                spin: 360,
                fadeOut: 0,
                general: 1
            }
        };
        if (baseEls) {
            Object.keys(this.baseEls).forEach(it => {
                this.els[it] = this.baseEls[it];
            });
        }

    }

    /**
     * init creates and binds the myr object to the window
     *
     * @param [{}] objs these are the base objects for this object
     *
     */
    init = () => {

        // Get all the function names of the Myr(this) class
        let funs = Object.keys(this).filter((p) => {
            return typeof this[p] === "function";
        });

        // For each function bind it to the window
        funs.forEach(element => {
            // If a collision is detected then do not override and warn
            if (window.hasOwnProperty(element)) {
                console.warn(`The ${element} of Myr is being overridden.\n` +
                    "If this was not intentional consider renaming the function.");
            } else {
                // Collision free so we can bind to window
                window[element] = this[element];
            }
        });
    }

    /**
     * Reset this.els to the base elements supplied to the constructor
     */
    reset = () => {
        // Reset base params, we might be able to merge two objects later
        this.id = 0;
        this.cursor = {
            color: "red",
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            scale: {
                x: 1,
                y: 1,
                z: 1
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            radius: "1",
            phiLength: 360,
            loop: true,
            duration: 1000,
            magnitude: {
                spin: 360,
                fadeOut: 0,
                general: 1
            }
        };
        // restore the base objects of the scene
        this.els = [];
        if (this.baseEls) {
            Object.keys(this.baseEls).forEach(it => {
                this.els[it] = this.baseEls[it];
            });
        }
    }


    /********************* TRANSFORMATIONS *********************/

    /**
     * Reset the cursor to the default
     */
    resetCursor = () => {
        this.cursor = {
            color: "red",
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            scale: {
                x: 1,
                y: 1,
                z: 1
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            radius: "1",
            phiLength: 360,
            loop: true,
            duration: 1000,
            magnitude: {
                spin: 360,
                fadeOut: 0,
                general: 1
            }
        };
    }

    genNewId = () => {
        return this.counter++;
    };

    /**
     * Sets the x, y, and z position of the cursor
     * 
     * @param {number} x New x position of the cursor
     * @param {number} y New y position of the cursor
     * @param {number} z New z position of the cursor
     */
    setPosition = (x = 0, y = 1, z = 0) => {
        if (typeof x === "number" && typeof y === "number" && typeof z === "number") {
            this.cursor.position = {
                x: x,
                y: y,
                z: z
            };
        } else {
            console.error("setPosition() must be all numeric values");
        }
        return { x: this.cursor.position.x, y: this.cursor.position.y, z: this.cursor.position.z };
    };

    /**
     * Sets the x position of the cursor
     * 
     * @param {number} x New x position of the cursor
     */
    setXPos = (x = 0) => {
        if (typeof x === "number") {
            this.cursor.position = { ...this.cursor.position, x };
        } else {
            console.error("must pass a numeric for setXPos");
        }
        return this.cursor.position.x;
    };

    /**
     * Sets the y position of the cursor
     * 
     * @param {number} y New y position of the cursor
     */
    setYPos = (y = 0) => {
        if (typeof y === "number") {
            this.cursor.position = { ...this.cursor.position, y };
        } else {
            console.error("must pass a numeric for setYPos");
        }
        return this.cursor.position.y;
    };

    /**
     * Sets the z position of the cursor
     * 
     * @param {number} z New z position of the cursor
     */
    setZPos = (z = 0) => {
        if (typeof z === "number") {
            this.cursor.position = { ...this.cursor.position, z };
        } else {
            console.error("must pass a numeric for setZPos");
        }
        return this.cursor.position.z;
    };

    /**
     * Increases the current x, y, and z position of the cursor by the given amount
     * 
     * @param {number} x Amount to increment the x position by
     * @param {number} y Amount to increment the y position by
     * @param {number} z Amount to increment the z position by
     */
    increasePosition = (x = 0, y = 0, z = 0) => {

        if (typeof x === "number" && typeof y === "number" && typeof z === "number") {
            this.cursor.position = {
                ...this.cursor.position,
                x: this.cursor.position.x + x,
                y: this.cursor.position.y + y,
                z: this.cursor.position.z + z
            };
        } else {
            console.error("increasePosition() must be all numeric values");
        }
        return { x: this.cursor.position.x, y: this.cursor.position.y, z: this.cursor.position.z };
    }

    /**
     * Increases the current x position of the cursor by the given amount
     * 
     * @param {number} x Amount to increment the x position by 
     */
    increaseXPos = (x = 1) => {
        if (typeof x === "number") {
            this.cursor.position = {
                ...this.cursor.position,
                x: this.cursor.position.x + x,
            };
        } else {
            console.error("must pass a numeric value for increaseXPos");
        }

        return this.cursor.position.x;
    }

    /**
     * Increases the current y position of the cursor by the given amount
     * 
     * @param {number} y Amount to increment the y position by 
     */
    increaseYPos = (y = 1) => {
        if (typeof y === "number") {
            this.cursor.position = {
                ...this.cursor.position,
                y: this.cursor.position.y + y,
            };
        } else {
            console.error("must pass a numeric value for increaseYPos");
        }

        return this.cursor.position.y;
    }

    /**
     * Increases the current z position of the cursor by the given amount
     * 
     * @param {number} z Amount to increment the z position by 
     */
    increaseZPos = (z = 1) => {
        if (typeof z === "number") {
            this.cursor.position = {
                ...this.cursor.position,
                z: this.cursor.position.z + z,
            };
        } else {
            console.error("must pass a numeric value for increaseZPos");
        }

        return this.cursor.position.z;
    }

    /**
     * Sets the x, y, and z scale of the cursor
     * 
     * @param {number} x New x scale of the cursor
     * @param {number} y New y scale of the cursor
     * @param {number} z New z scale of the cursor
     */
    setScale = (x = 1, y = 1, z = 1) => {
        if (typeof x === "number" && typeof y === "number" && typeof z === "number") {
            this.cursor.scale = {
                x: x,
                y: y,
                z: z
            };
        } else {
            console.error("setScale() must be all numeric values");
        }
        return { x: this.cursor.scale.x, y: this.cursor.scale.y, z: this.cursor.scale.z };
    };

    /**
     * Applies a given scale along the x dimension of the cursor
     * 
     * @param {number} x New x scale of the cursor
     */
    setXScale = (x) => {
        if (typeof x === "number") {
            this.cursor.scale = { ...this.cursor.scale, x };
        } else {
            console.error("must pass a numeric for setXScale");
        }
        return this.cursor.scale.x;
    };

    /**
     * Applies a given scale along the y dimension of the cursor
     * 
     * @param {number} y New y scale of the cursor
     */
    setYScale = (y) => {
        if (typeof y === "number") {
            this.cursor.scale = { ...this.cursor.scale, y };
        } else {
            console.error("must pass a numeric for setYScale");
        }
        return this.cursor.scale.y;
    };

    /**
     * Applies a given scale along the z dimension of the cursor
     * 
     * @param {number} z New z scale of the cursor
     */
    setZScale = (z) => {
        if (typeof z === "number") {
            this.cursor.scale = { ...this.cursor.scale, z };
        } else {
            console.error("must pass a numeric for setZScale");
        }
        return this.cursor.scale.z;
    };

    /**
     * Sets the x, y, and z rotation of the cursor
     * 
     * @param {number} x New x rotation of the cursor
     * @param {number} y New y rotation of the cursor
     * @param {number} z New z rotation of the cursor
     */
    setRotation = (x, y = 0, z = 0) => {
        if (typeof x === "number" && typeof y === "number" && typeof z === "number") {
            this.cursor.rotation = {
                x: x,
                y: y,
                z: z
            };
        } else {
            console.error("setRotation() must be all numeric values");
        }
        return { x: this.cursor.rotation.x, y: this.cursor.rotation.y, z: this.cursor.rotation.z };
    }

    /**
     * Applies a given x rotation to the cursor
     * 
     * @param {number} x New x rotation of the cursor
     */
    pitchX = (x) => {
        if (typeof x === "number") {
            this.cursor.rotation = { ...this.cursor.rotation, x };
        } else {
            console.error("must pass a numeric for pitchX");
        }
        return this.cursor.rotation.x;
    };

    /**
     * Applies a given y rotation to the cursor
     * 
     * @param {number} y New y rotation of the cursor
     */
    yawY = (y) => {
        if (typeof y === "number") {
            this.cursor.rotation = { ...this.cursor.rotation, y };
        } else {
            console.error("must pass a numeric for yawY");
        }
        return this.cursor.rotation.y;
    };

    /**
     * Applies a given z rotation to the cursor
     * 
     * @param {number} z New z rotation of the cursor
     */
    rollZ = (z) => {
        if (typeof z === "number") {
            this.cursor.rotation = { ...this.cursor.rotation, z };
        } else {
            console.error("must pass a numeric for rollZ");
        }
        return this.cursor.rotation.z;
    };

    /**
     * Sets the radius of the cursor
     * 
     * @param {number} i New radius of the cursor
     */
    setRadius = (i) => {
        if (typeof i === "number") {
            this.cursor.radius = String(i);
        } else {
            console.error("must pass a numeric for setRadius");
        }
        return this.cursor.radius;
    };

    /**
     * Sets the phi length of the cursor
     * 
     * @param {number} i New phi length of the cursor
     */
    setPhiLength = (i) => {
        if (typeof i === "number") {
            this.cursor.phiLength = String(i);
        } else {
            console.error("must pass a numeric for setPhiLength");
        }
        return this.cursor.phiLength;
    };

    /**
     * Sets the loop of the cursor
     * 
     * @param {number} i New loop of the cursor
     */
    setLoop = (i) => {
        this.cursor.loop = Boolean(i);
        return this.cursor.loop;
    };

    /**
     * Sets the magnitude of the cursor
     * 
     * @param {number} i New magnitude of the cursor
     */
    setMagnitude = (i) => {
        if (typeof i === "number") {
            this.cursor.magnitude = {
                spin: i,
                fadeOut: i,
                general: i
            };
        } else {
            console.error("must pass a numeric for setMagnitude");
        }
        return this.cursor.magnitude.general;
    };

    /**
     * Sets the duration of the cursor
     * 
     * @param {number} i New duration of the cursor
     */
    setDuration = (i) => {
        if (typeof i === "number") {
            this.cursor.duration = i;
        } else {
            console.error("must pass a numeric for setDuration");
        }
        return this.cursor.duration;
    };

    /**
     * Sets the current color of the cursor. Defaults to white.
     * 
     * @param {number} color New color of the cursor
     */
    setColor = (color = "white") => {
        this.cursor.color = color.toLowerCase();
        return this.cursor.color;
    }

    setCursorAttribute = (key = "", value = "") => {
        if (typeof (key) !== "string" || key === "") {
            console.error("Error: Invalid key");
            return this.cursor;
        }
        switch (key.toLowerCase()) {
            case "color":
                this.setColor(value);
                break;
            case "position":
                this.setPosition(value.x, value.y, value.z);
                break;
            case "scale":
                this.setScale(value.x, value.y, value.z);
                break;
            case "rotation":
                this.setRotation(value.x, value.y, value.z);
                break;
            case "radius":
                this.setRadius(value);
                break;
            case "philength":
                this.setPhiLength(value);
                break;
            case "loop":
                this.setLoop(value);
                break;
            case "duration":
                this.setDuration(value);
                break;
            case "magnitude":
                this.setMagnitude(value);
                break;
            default:
                this.cursor[key] = value;
        }
        return this.cursor;
    }

    getCursorAttribute = (key = "") => {
        return this.cursor[key];
    }

    /**
     * Returns a random valid color.
     * 
     * @param {array} colors An array of colors to choose from. If left 
     * empty then all colors are drawn from
     */
    getRandomColor = (colors = null) => {
        let color;
        if (Array.isArray(colors) && colors.length !== 0) {
            color = colors[Math.floor(Math.random() * colors.length)];
        }
        else {
            let i, letters;
            letters = "0123456789ABCDEF";
            color = "#";
            i = 0;
            while (i < 6) {
                color += letters[Math.floor(Math.random() * 16)];
                i++;
            }
        }
        this.cursor.color = color;
        return color;
    }

    drop = (outerElId) => {
        this.getEl(outerElId)["dynamic-body"] = "shape: box; mass: 5";
        return outerElId;
    }

    /**
     * Allows the entity to be dropped
     * 
     * @param {number} outerElId !!!DESCRIPTION NEEDED!!!
     * @param {number} mass !!!DESCRIPTION NEEDED!!!
     */
    makeDroppable = (outerElId, mass = 2) => {
        let el = this.getEl(outerElId);
        let dynamicBody = `shape: auto; mass: ${mass}; angularDamping: 0.5; linearDamping: 0.5;`;
        el["dynamic-body"] = dynamicBody;
        return outerElId;
    }

    /**
     * Disallows the entity to be dropped
     * 
     * @param {number} outerElId !!!DESCRIPTION NEEDED!!!
     */
    makeUnDroppable = (outerElId) => {
        let el = this.getEl(outerElId);
        //Only makes an item undroppable if it is droppable but is not pushable
        if (el["dynamic-body"] && (!el["force-pushable"] || el["force-pushable"] === "false")) {
            el["dynamic-body"] = null;
        }
        return outerElId;
    }

    /**
     * Allows the entity to be pushed
     * 
     * @param {number} outerElId !!!DESCRIPTION NEEDED!!!
     * @param {number} mass !!!DESCRIPTION NEEDED!!!
     */
    makePushable = (outerElId, mass = 2) => {
        let el = this.getEl(outerElId);
        let dynamicBody = `shape: auto; mass: ${mass}; angularDamping: 0.5; linearDamping: 0.5;`;
        el["dynamic-body"] = dynamicBody;
        el["force-pushable"] = "true";
        return outerElId;
    }

    /**
     * Disallows the entity to be pushed
     * 
     * @param {number} outerElId !!!DESCRIPTION NEEDED!!!
     */
    makeUnPushable = (outerElId) => {
        let el = this.getEl(outerElId);
        if (el["force-pushable"]) {
            el["dynamic-body"] = null;
            el["force-pushable"] = "false";
        }
        return outerElId;
    }

    /**
     * Disallows the entity to be pushed
     * 
     * @param {number} outerElId !!!DESCRIPTION NEEDED!!!
     */
    makeUnPushable = (outerElId) => {
        let el = this.getEl(outerElId);
        if (el["force-pushable"]) {
            el["dynamic-body"] = null;
            el["force-pushable"] = "false";
        }
        return outerElId;
    }

    push = (outerElId, x, y, z) => {
        // Add an event listener
        document.addEventListener("myr-view-rendered", () => {
            let el = document.querySelector("#" + outerElId);
            if (!el) {
                return;
            }
            el.addEventListener("body-loaded", () => {
                el.body.applyImpulse(
                    /* impulse */        new CANNON.Vec3(x, y, z),
                    /* world position */ new CANNON.Vec3().copy(el.object3D.position)
                );
            });
        });
        return outerElId;
    }

    /**
     * Render an Aframe box with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    box = (params) => {
        let base = {
            geometry: "primitive: box;",
            id: "box" + this.genNewId(),
            material: `color: ${this.cursor.color}; side: double`,
            position: { ...this.cursor.position },
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
        };
        return this.mergeProps(base, params);
    }

    /**
     * Render an Aframe circle with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    circle = (params) => {
        let base = {
            geometry: `primitive: circle; radius: ${this.cursor.radius}; theta-length: ${this.cursor.phiLength};`,
            id: "circ" + this.genNewId(),
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color}; side: double;`,
        };
        return this.mergeProps(base, params);
    }

    /**
     * Render an Aframe cone with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    cone = (params) => {
        let base = {
            id: "cone" + this.genNewId(),
            geometry: `primitive: cone; radiusBottom: ${this.cursor.radius}; radiusTop: 0.1;`,
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color}; side: double;`,
        };
        return this.mergeProps(base, params);
    }

    /**
     * Render an Aframe cylinder with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    cylinder = (params) => {
        let base = {
            id: "cyl" + this.genNewId(),
            geometry: `primitive: cylinder; radius: ${this.cursor.radius}; theta-length: ${this.cursor.phiLength};`,
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color};  side: double;`,
        };
        return this.mergeProps(base, params);
    }


    /**
     * Render an Aframe dodecahedron with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    dodecahedron = (params) => {
        let base = {
            id: "dod" + this.genNewId(),
            geometry: `primitive: dodecahedron; radius: ${this.cursor.radius};`,
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color}; side: double;`,
        };
        return this.mergeProps(base, params);
    }

    /**
     * Render an Aframe icosahedron with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    icosahedron = (params) => {
        let base = {
            id: "iso" + this.genNewId(),
            geometry: "primitive: icosahedron;",
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color};  side: double;`,
        };
        return this.mergeProps(base, params);
    }

    /**
     * Render an Aframe octahedron with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    octahedron = (params) => {
        let base = {
            id: "oct" + this.genNewId(),
            geometry: "primitive: octahedron;",
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color};  side: double;`,
        };
        return this.mergeProps(base, params);
    }

    /**
     * Render an Aframe line with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    line = (path, params) => {
        let base = {
            id: "line" + this.genNewId(),
            tube: true,
            radius: ".01",
            path: path,
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color};  side: double;`,
        };
        return this.mergeProps(base, params);
    }

    /**
     * Render an Aframe plane with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    plane = (params) => {
        let base = {
            id: "plane" + this.genNewId(),
            geometry: `primitive: plane; height: 1; width: 1; phi-length: ${this.cursor.phiLength};`,
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color}; side: double;`,
        };
        return this.mergeProps(base, params);
    }

    /**
     * Render an Aframe polyhedron with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    polyhedron = (params) => {
        let base = {
            id: "poly" + this.genNewId(),
            geometry: `primitive: sphere; segmentsWidth: 2; segmentsHeight: 8; phi-length: ${this.cursor.phiLength};`,
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color}; side: double;`,
        };
        return this.mergeProps(base, params);
    }

    /**
     * Render an Aframe ring with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    ring = (params) => {
        let base = {
            id: "ring" + this.genNewId(),
            geometry: `primitive: ring; radiusInner: 0.5; radiusOuter: 1; theta-length: ${this.cursor.phiLength};`,
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color}; side: double;`,
        };
        return this.mergeProps(base, params);
    }

    /**
     * Render an Aframe sphere with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    sphere = (params) => {
        let base = {
            id: "sphere" + this.genNewId(),
            geometry: `primitive: sphere; phi-length: ${this.cursor.phiLength}`,
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color}; side: double;`,
        };
        return this.mergeProps(base, params);
    }

    /**
     * Render an Aframe tetrahedron with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    tetrahedron = (params) => {
        let base = {
            id: "tetra" + this.genNewId(),
            geometry: "primitive: tetrahedron;",
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color}; side: double;`,
        };
        return this.mergeProps(base, params);
    }

    /**
    * Render an Aframe text with current Myr settings
    *
    * This is a bit tricky. We need to pass text so we can decide how to render it.
    * This throws a warning since text is not part of the entity system.
    * Instead we pass it and then pull it off again if we see it.
    */
    text = (text, params) => {
        if (typeof text !== "string") {
            text = "Default";
        }
        let base = {
            text: true,
            value: text,
            id: "txt" + this.genNewId(),
            side: "double",
            color: this.cursor.color,
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
        };
        if (!params || typeof params === "string") {
            this.els[base.id] = { ...base };
        } else {
            this.els[base.id] = { ...base, ...params };
        }
        return base.id;
    }

    /**
     * Render an Aframe torus with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    torus = (params) => {
        let base = {
            id: "torus" + this.genNewId(),
            geometry: `primitive: torus; radius: ${this.cursor.radius}; radiusTubular: 0.5; arc: 360; arc: ${this.cursor.phiLength};`,
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color};  side: double;`,
        };
        return this.mergeProps(base, params);
    }

    /**
     * Render an Aframe torusknot with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    torusknot = (params) => {
        let base = {
            id: "torKn" + this.genNewId(),
            geometry: "primitive: torusKnot;",
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color}; side: double`,
            p: 2,
            q: 3,
        };
        return this.mergeProps(base, params);
    }

    /**
     * Render an Aframe triangle with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    triangle = (params) => {
        let base = {
            id: "tri" + this.genNewId(),
            geometry: "primitive: triangle;",
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color};  side: double;`,
        };
        return this.mergeProps(base, params);
    }

    /**
     * Render an Aframe tube with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    tube = (path, params) => {
        let base = {
            id: "tube" + this.genNewId(),
            tube: true,
            radius: this.cursor.radius,
            path: path,
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color};  side: double;`,
        };
        return this.mergeProps(base, params);
    }

    /**
     * Render an Aframe light with current Myr settings
     * 
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    light = () => {
        let el = {
            color: "lgt" + this.getRandomColor(),
            position: this.cursor.position,
            geometry: {
                primitive: "light"
            },
        };
        this.els.push(el);
        return el;
    }

    // Prism is an alias for Polyhedron
    prism = this.polyhedron

    // Cube is an alias for Box
    cube = this.box


    /********************* ANIMATIONS *********************/

    /**
     * Animate the Aframe element which is passed as arg
     * 
     * @param {number} outerElId target element ID
     * @param {number} magnitude !!!DESCRIPTION NEEDED!!!
     * @param {*} loop !!!DESCRIPTION NEEDED!!!
     * @param {*} duration !!!DESCRIPTION NEEDED!!!
     */
    animate = (outerElId, magnitude = null, loop = null, duration = null) => {
        magnitude = magnitude !== null ? magnitude : this.cursor.magnitude.spin;
        loop = loop !== null ? loop : this.cursor.loop;
        duration = duration !== null ? duration : this.cursor.duration;
        let el = this.getEl(outerElId);
        let anim = `
      property: rotation;
      dir: alternate;
      to: ${el.rotation.x} ${el.rotation.y + magnitude} ${el.rotation.z};
      dur: ${duration};
      loop: ${Boolean(loop)};
    `;
        el.animation = anim;
        return outerElId;
    };

    /**
     * Apply a spin animation to the Aframe element which is passed as arg
     * 
     * @param {number} outerElId target element ID
     * @param {number} magnitude !!!DESCRIPTION NEEDED!!!
     * @param {*} loop !!!DESCRIPTION NEEDED!!!
     * @param {*} duration !!!DESCRIPTION NEEDED!!!
     */
    spin = (outerElId, magnitude = null, loop = null, duration = null) => {
        magnitude = magnitude !== null ? magnitude : this.cursor.magnitude.spin;
        loop = loop !== null ? loop : this.cursor.loop;
        duration = duration !== null ? duration : this.cursor.duration;
        let el = this.getEl(outerElId);
        let anim = `
      property: rotation;
      dir: alternate;
      dur: ${duration};
      loop: ${Boolean(loop)};
      easing: linear;
      to: ${el.rotation.x} ${el.rotation.y + magnitude} ${el.rotation.z};
    `;
        el.animation__spin = anim;
        return outerElId;
    };

    /**
     * Apply a yoyo animation to the Aframe element which is passed as arg
     * 
     * @param {number} outerElId target element ID
     * @param {number} magnitude !!!DESCRIPTION NEEDED!!!
     * @param {*} loop !!!DESCRIPTION NEEDED!!!
     * @param {*} duration !!!DESCRIPTION NEEDED!!!
     */
    yoyo = (outerElId, magnitude = null, loop = null, duration = null) => {
        magnitude = magnitude !== null ? magnitude : this.cursor.magnitude.general;
        loop = loop !== null ? loop : this.cursor.loop;
        duration = duration !== null ? duration : this.cursor.duration;
        let el = this.getEl(outerElId);
        let anim = `
      property: position;
      dir: alternate;
      dur: ${duration};
      loop: ${Boolean(loop)};
      to: ${el.position.x} ${el.position.y + magnitude} ${el.position.z};
    `;
        el.animation__yoyo = anim;
        return outerElId;
    };

    /**
     * Apply a sideToSide animation to the Aframe element which is passed as arg
     * 
     * @param {number} outerElId target element ID
     * @param {number} magnitude !!!DESCRIPTION NEEDED!!!
     * @param {*} loop !!!DESCRIPTION NEEDED!!!
     * @param {*} duration !!!DESCRIPTION NEEDED!!!
     */
    sideToSide = (outerElId, magnitude = null, loop = null, duration = null) => {
        magnitude = magnitude !== null ? magnitude : this.cursor.magnitude.general;
        loop = loop !== null ? loop : this.cursor.loop;
        duration = duration !== null ? duration : this.cursor.duration;
        let el = this.getEl(outerElId);
        let anim = `
      dir: alternate;
      dur: ${duration};
      loop: ${Boolean(loop)};
      property: position;
      to: ${el.position.x + magnitude} ${el.position.y} ${el.position.z};
    `;
        el.position = { ...el.position, x: el.position.x - magnitude };
        el.animation__sidetoside = anim;
        return outerElId;
    };

    /**
     * Apply a goUp animation to the Aframe element which is passed as arg
     * 
     * @param {number} outerElId target element ID
     * @param {number} magnitude !!!DESCRIPTION NEEDED!!!
     * @param {*} loop !!!DESCRIPTION NEEDED!!!
     * @param {*} duration !!!DESCRIPTION NEEDED!!!
     */
    goUp = (outerElId, magnitude = null, loop = null, duration = null) => {
        magnitude = magnitude !== null ? magnitude : this.cursor.magnitude.general;
        loop = loop !== null ? loop : this.cursor.loop;
        duration = duration !== null ? duration : this.cursor.duration;
        let el = this.getEl(outerElId);
        let anim = `
      property: position;
      dir: alternate;
      dur: ${duration};
      loop: ${Boolean(loop)};
      to: ${el.position.x} ${el.position.y + magnitude} ${el.position.z};
    `;
        el.animation__goup = anim;
        return outerElId;
    };

    /**
     * Apply a goDown animation to the Aframe element which is passed as arg
     * 
     * @param {number} outerElId target element ID
     * @param {number} magnitude !!!DESCRIPTION NEEDED!!!
     * @param {*} loop !!!DESCRIPTION NEEDED!!!
     * @param {*} duration !!!DESCRIPTION NEEDED!!!
     */
    goDown = (outerElId, magnitude = null, loop = null, duration = null) => {
        magnitude = magnitude !== null ? magnitude : this.cursor.magnitude.general;
        loop = loop !== null ? loop : this.cursor.loop;
        duration = duration !== null ? duration : this.cursor.duration;
        let el = this.getEl(outerElId);
        let anim = `
      property: position;
      dir: alternate;
      dur: ${duration};
      loop: ${Boolean(loop)};
      to: ${el.position.x} ${el.position.y - magnitude} ${el.position.z};
    `;
        el.animation__godown = anim;
        return outerElId;
    };

    /**
     * Apply a goLeft animation to the Aframe element which is passed as arg
     * 
     * @param {number} outerElId target element ID
     * @param {number} magnitude !!!DESCRIPTION NEEDED!!!
     * @param {*} loop !!!DESCRIPTION NEEDED!!!
     * @param {*} duration !!!DESCRIPTION NEEDED!!!
     */
    goLeft = (outerElId, magnitude = null, loop = null, duration = null) => {
        magnitude = magnitude !== null ? magnitude : this.cursor.magnitude.general;
        loop = loop !== null ? loop : this.cursor.loop;
        duration = duration !== null ? duration : this.cursor.duration;
        let el = this.getEl(outerElId);
        let anim = `
      property: position;
      dir: alternate;
      dur: ${duration};
      loop: ${Boolean(loop)};
      to: ${el.position.x - magnitude} ${el.position.y} ${el.position.z};
    `;
        el.animation__goleft = anim;
        return outerElId;
    };

    /**
     * Apply a goRight animation to the Aframe element which is passed as arg
     * 
     * @param {number} outerElId target element ID
     * @param {number} magnitude !!!DESCRIPTION NEEDED!!!
     * @param {*} loop !!!DESCRIPTION NEEDED!!!
     * @param {*} duration !!!DESCRIPTION NEEDED!!!
     */
    goRight = (outerElId, magnitude = null, loop = null, duration = null) => {
        magnitude = magnitude !== null ? magnitude : this.cursor.magnitude.general;
        loop = loop !== null ? loop : this.cursor.loop;
        duration = duration !== null ? duration : this.cursor.duration;
        let el = this.getEl(outerElId);
        let anim = `
      property: position;
      dir: alternate;
      dur: ${duration};
      loop: ${Boolean(loop)};
      to: ${el.position.x + magnitude} ${el.position.y} ${el.position.z};
    `;
        el.animation__goright = anim;
        return outerElId;
    };

    /**
     * Apply a goTowards animation to the Aframe element which is passed as arg
     * 
     * @param {number} outerElId target element ID
     * @param {number} magnitude !!!DESCRIPTION NEEDED!!!
     * @param {*} loop !!!DESCRIPTION NEEDED!!!
     * @param {*} duration !!!DESCRIPTION NEEDED!!!
     */
    goTowards = (outerElId, magnitude = null, loop = null, duration = null) => {
        magnitude = magnitude !== null ? magnitude : this.cursor.magnitude.general;
        loop = loop !== null ? loop : this.cursor.loop;
        duration = duration !== null ? duration : this.cursor.duration;
        let el = this.getEl(outerElId);
        let anim = `
      property: position;
      dir: alternate;
      dur: ${duration};
      loop: ${Boolean(loop)};
      to: ${el.position.x} ${el.position.y} ${el.position.z + magnitude};
    `;
        el.animation__goleft = anim;
        return outerElId;
    };

    /**
     * Apply a goAway animation to the Aframe element which is passed as arg
     * 
     * @param {number} outerElId target element ID
     * @param {number} magnitude !!!DESCRIPTION NEEDED!!!
     * @param {*} loop !!!DESCRIPTION NEEDED!!!
     * @param {*} duration !!!DESCRIPTION NEEDED!!!
     */
    goAway = (outerElId, magnitude = null, loop = null, duration = null) => {
        magnitude = magnitude !== null ? magnitude : this.cursor.magnitude.general;
        loop = loop !== null ? loop : this.cursor.loop;
        duration = duration !== null ? duration : this.cursor.duration;
        let el = this.getEl(outerElId);
        let anim = `
      property: position;
      dir: alternate;
      dur: ${duration};
      loop: ${Boolean(loop)};
      to: ${el.position.x} ${el.position.y} ${el.position.z - magnitude};
    `;
        el.animation__goaway = anim;
        return outerElId;
    };

    /**
     * Apply a grow animation to the Aframe element which is passed as arg
     * 
     * @param {number} outerElId target element ID
     * @param {number} magnitude !!!DESCRIPTION NEEDED!!!
     * @param {*} loop !!!DESCRIPTION NEEDED!!!
     * @param {*} duration !!!DESCRIPTION NEEDED!!!
     */
    grow = (outerElId, magnitude = null, loop = null, duration = null) => {
        magnitude = magnitude !== null ? magnitude : this.cursor.magnitude.general;
        loop = loop !== null ? loop : this.cursor.loop;
        duration = duration !== null ? duration : this.cursor.duration;
        let el = this.getEl(outerElId);
        let anim = `
      property: scale;
      dir: alternate;
      dur: ${duration};
      loop: ${Boolean(loop)};
      to: ${el.scale.x * magnitude} ${el.scale.y * magnitude} ${el.scale.z * magnitude};
    `;
        el.animation__grow = anim;
        return outerElId;
    };

    /**
     * Apply a shrink animation to the Aframe element which is passed as arg
     * 
     * @param {number} outerElId target element ID
     * @param {number} magnitude !!!DESCRIPTION NEEDED!!!
     * @param {*} loop !!!DESCRIPTION NEEDED!!!
     * @param {*} duration !!!DESCRIPTION NEEDED!!!
     */
    shrink = (outerElId, magnitude = null, loop = null, duration = null) => {
        magnitude = magnitude !== null ? magnitude : this.cursor.magnitude.general;
        loop = loop !== null ? loop : this.cursor.loop;
        duration = duration !== null ? duration : this.cursor.duration;
        let el = this.getEl(outerElId);
        let anim = `
      property: scale;
      dir: alternate;
      dur: ${duration};
      loop: ${Boolean(loop)};
      to: ${el.scale.x / magnitude} ${el.scale.y / magnitude} ${el.scale.z / magnitude};
    `;
        el.animation__shrink = anim;
        return outerElId;
    };

    /**
     * Apply a fadeOut animation to the Aframe element which is passed as arg
     * 
     * @param {number} outerElId target element ID
     * @param {number} magnitude !!!DESCRIPTION NEEDED!!!
     * @param {*} loop !!!DESCRIPTION NEEDED!!!
     * @param {*} duration !!!DESCRIPTION NEEDED!!!
     */
    fadeOut = (outerElId, magnitude = null, loop = null, duration = null) => {
        magnitude = magnitude !== null ? magnitude : this.cursor.magnitude.fadeOut;
        loop = loop !== null ? loop : this.cursor.loop;
        duration = duration !== null ? duration : this.cursor.duration;
        let el = this.getEl(outerElId);
        let anim = `
      property: components.material.material.opacity;
      dir: alternate;
      dur: ${duration};
      loop: ${Boolean(loop)};
      isRawProperty: true;
      from: 1;
      to: ${magnitude};
    `;
        el.material = el.material + "; transparent: true;";
        el.animation__fadeout = anim;
        return outerElId;
    }

    /**
     * Apply a fadeIn animation to the Aframe element which is passed as arg
     * 
     * @param {number} outerElId target element ID
     * @param {number} magnitude !!!DESCRIPTION NEEDED!!!
     * @param {*} loop !!!DESCRIPTION NEEDED!!!
     * @param {*} duration !!!DESCRIPTION NEEDED!!!
     */
    fadeIn = (outerElId, magnitude = null, loop = null, duration = null) => {
        magnitude = magnitude !== null ? magnitude : this.cursor.magnitude.general;
        loop = loop !== null ? loop : this.cursor.loop;
        duration = duration !== null ? duration : this.cursor.duration;
        let el = this.getEl(outerElId);
        let anim = `
      property: components.material.material.opacity;
      dir: alternate;
      dur: ${duration};
      loop: ${Boolean(loop)};
      isRawProperty: true;
      from: 0;
      to: ${magnitude};
    `;
        el.material = el.material + "; transparent: true;";
        el.animation__fadein = anim;
        return outerElId;
    }

    /**
     * Apply a colorShift animation to the Aframe element which is passed as arg
     * 
     * @param {number} outerElId target element ID
     * @param {*} color !!!DESCRIPTION NEEDED!!!
     */
    colorShift = (outerElId, color) => {
        let el = this.getEl(outerElId);
        if (String(el.id).includes("grp")) {
            for (let i in el.els) {
                let innerEl = el.els[i];
                //innerEl.material.split(/\s|;/) returns an array of strings separated by " " and ";",
                //color is always its first attribute (after "color: ")
                let anim = `
          property: components.material.material.color;
          from: ${(innerEl.material.split(/\s|;/))[1]};
          to: ${color};
          dur: ${this.cursor.duration};
          dir: alternate;
          loop: ${Boolean(this.cursor.loop)};
          isRawProperty: true;
          type: color;
        `;
                innerEl.animation__color = anim;

            }
            return outerElId;
        }
        let anim = `
      property: components.material.material.color;
      from: ${(el.material.split(/\s|;/))[1]};
      to: ${color};
      dur: ${this.cursor.duration};
      dir: alternate;
      loop: ${Boolean(this.cursor.loop)};
      isRawProperty: true;
      type: color;
    `;
        el.animation__color = anim;
        return outerElId;
    }

    /********************* GETTERS *********************/

    /**
     * Gets the current color of the cursor
     */
    getColor = () => {
        return this.cursor.color;
    };

    /**
     * Gets the current x position of the cursor
     */
    getXPos = () => {
        return this.cursor.position.x;
    };

    /**
     * Gets the current y position of the cursor
     */
    getYPos = () => {
        return this.cursor.position.y;
    };

    /**
     * Gets the current z position of the cursor
     */
    getZPos = () => {
        return this.cursor.position.z;
    };

    /**
     * Gets the current x scale of the cursor
     */
    getXScale = () => {
        return this.cursor.scale.x;
    };

    /**
     * Gets the current y scale of the cursor
     */
    getYScale = () => {
        return this.cursor.scale.y;
    };

    /**
     * Gets the current z scale of the cursor
     */
    getZScale = () => {
        return this.cursor.scale.z;
    };

    /**
     * Gets the current x rotation of the cursor
     */
    getXRotation = () => {
        return this.cursor.rotation.x;
    };

    /**
     * Gets the current y rotation of the cursor
     */
    getYRotation = () => {
        return this.cursor.rotation.y;
    };

    /**
     * Gets the current z rotation of the cursor
     */
    getZRotation = () => {
        return this.cursor.rotation.z;
    };

    /**
     * Gets the current radius of the cursor
     */
    getRadius = () => {
        return this.cursor.radius;
    };

    /**
     * Gets the current phi length of the cursor
     */
    getPhiLength = () => {
        return this.cursor.phiLength;
    };

    /**
     * Gets the current lopp of the cursor
     */
    getLoop = () => {
        return this.cursor.loop;
    };

    /**
     * Gets the current duration of the cursor
     */
    getDuration = () => {
        return this.cursor.duration;
    };
    
    /**
     * Gets the current magnitude of the cursor
     */
    getMagnitude = () => {
        return this.cursor.magnitude.general;
    };



    // MODELS
    addCModel = () => {
        let asset = {
            id: "c-obj",
            src: "/img/c.obj"
        };
        let el = {
            "obj-model": "obj: #c-obj",
            mtl: "c-mtl",
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation
        };
        this.els.push(el);
        this.assets.push(asset);
        return el;
    }

    /**
     * Gets the element associated with the given element ID
     *  
     * @param {string} outerElId target element ID
     */ 
    getEl = (outerElId) => {
        if (outerElId.entity) {
            outerElId = outerElId.id;
        }
        return this.els[outerElId];
    }

    /**
     * Interface for setting an object's parameters in the DOM
     * the idea is the setup an event listener as an almost DOM ready listener.
     *
     * @param {string} outerElId target element ID
     * @param {string} type what param to change
     * @param {*} newParam changes
     */
    change = (outerElId, type, newParam) => {
        document.addEventListener("myr-view-rendered", () => {
            try {
                let el = document.querySelector("#" + outerElId);
                el.setAttribute(type, newParam);
            } catch (error) {
                return Error("change() failed execution" +
                    "Ensure you are passing the proper id to the method" +
                    `Error msg: ${error}`);
            }
        });
    }

    syncChange = (outerElId, type, newParam) => {
        try {
            let el = document.querySelector("#" + outerElId);
            el.setAttribute(type, newParam);
        } catch (error) {
            let err = Error("syncChange() failed execution\n" +
                "Ensure you are passing the proper id to the method" +
                `Error msg: ${error}`);
            console.error(err);
            return err;
        }
    }

    /**
    * This creates an entity w shape of object and merges with supplied params
    *
    * @param {string} shape one of the allowed arguments to this.core()
    * @param {obj} params arguments to be merged, not guarenteed to be successful
    */
    mergeProps = (entity, params) => {
        let id = params && params.id ? params.id : entity.id;
        if (!params || typeof params === "string") {
            this.els[id] = entity;
        } else {
            this.els[id] = { ...entity, ...params };
        }
        return id;
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Return a Entity that can be used to group elements together
     */
    group = () => {
        let base = {
            id: "grp" + this.genNewId(),
            position: { ...this.cursor.position },
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
        };
        let entity = new Group(this, base.id);
        this.els[base.id] = { ...base, ...entity.entObj() };
        return entity;
    }

    /**
     * Transfer the object from MYR to the Entity
     * 
     * @param {number} id !!!DESCRIPTION NEEDED!!! 
     */
    transfer = (id) => {
        let retVal = this.els[id];
        delete this.els[id];
        return retVal;
    }

    HALT = () => {
        // console.log(this);
        // console.log("Halted");
    }

    infiniteLoopDetector = (function () {
        let map = {};

        // define an InfiniteLoopError class
        function InfiniteLoopError(msg) {
            Error.call(this, msg);
            this.type = "InfiniteLoopError";
        }

        function infiniteLoopDetector(id) {
            if (id in map) {
                if (Date.now() - map[id] > 200) {
                    delete map[id];
                    throw new Error("Loop runing too long!", InfiniteLoopError);
                }
            } else {
                map[id] = Date.now();
            }
        }

        infiniteLoopDetector.wrap = function (codeStr) {
            if (typeof codeStr !== "string") {
                throw new Error("Input type must be a string");
            }
            // this is not a strong regex, but enough to use at the time
            return codeStr.replace(/for *\(.*\{|while *\(.*\{|do *\{/g, function (loopHead) {
                let id = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
                return `infiniteLoopDetector(${id});${loopHead}infiniteLoopDetector(${id});`;
            });
        };

        infiniteLoopDetector.unwrap = function (codeStr) {
            return codeStr.replace(/infiniteLoopDetector\([0-9]*?\);/g, "");
        };

        return infiniteLoopDetector;
    }());
}

export default Myr;
