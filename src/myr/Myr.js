<<<<<<< HEAD
import "aframe";
import "aframe-physics-system";
import Group from "./Group";
import CANNON from "cannon";
=======
import 'aframe';
import 'aframe-physics-system';
import 'aframe-csg-meshs';
import Group from './Group';
import CANNON from 'cannon';
>>>>>>> updated Reference.js and Myr.js

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
    * @summary - init creates and binds the myr object to the window
    *
    * @param [{}] objs - these are the base objects for this object
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
    * @summary - Reset this.els to the base elements supplied to the constructor
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
    * @summary - Reset the cursor to the default
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

    setXPos = (x = 0) => {
        if (typeof x === "number") {
            this.cursor.position = { ...this.cursor.position, x };
        } else {
            console.error("must pass a numeric for setXPos");
        }
        return this.cursor.position.x;
    };

    setYPos = (y = 0) => {
        if (typeof y === "number") {
            this.cursor.position = { ...this.cursor.position, y };
        } else {
            console.error("must pass a numeric for setYPos");
        }
        return this.cursor.position.y;
    };

    setZPos = (z = 0) => {
        if (typeof z === "number") {
            this.cursor.position = { ...this.cursor.position, z };
        } else {
            console.error("must pass a numeric for setZPos");
        }
        return this.cursor.position.z;
    };

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

    setXScale = (x) => {
        if (typeof x === "number") {
            this.cursor.scale = { ...this.cursor.scale, x };
        } else {
            console.error("must pass a numeric for setXScale");
        }
        return this.cursor.scale.x;
    };

    setYScale = (y) => {
        if (typeof y === "number") {
            this.cursor.scale = { ...this.cursor.scale, y };
        } else {
            console.error("must pass a numeric for setYScale");
        }
        return this.cursor.scale.y;
    };

    setZScale = (z) => {
        if (typeof z === "number") {
            this.cursor.scale = { ...this.cursor.scale, z };
        } else {
            console.error("must pass a numeric for setZScale");
        }
        return this.cursor.scale.z;
    };

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

    pitchX = (x) => {
        if (typeof x === "number") {
            this.cursor.rotation = { ...this.cursor.rotation, x };
        } else {
            console.error("must pass a numeric for pitchX");
        }
        return this.cursor.rotation.x;
    };

    yawY = (y) => {
        if (typeof y === "number") {
            this.cursor.rotation = { ...this.cursor.rotation, y };
        } else {
            console.error("must pass a numeric for yawY");
        }
        return this.cursor.rotation.y;
    };

    rollZ = (z) => {
        if (typeof z === "number") {
            this.cursor.rotation = { ...this.cursor.rotation, z };
        } else {
            console.error("must pass a numeric for rollZ");
        }
        return this.cursor.rotation.z;
    };

    setRadius = (i) => {
        if (typeof i === "number") {
            this.cursor.radius = String(i);
        } else {
            console.error("must pass a numeric for setRadius");
        }
        return this.cursor.radius;
    };

    setPhiLength = (i) => {
        if (typeof i === "number") {
            this.cursor.phiLength = String(i);
        } else {
            console.error("must pass a numeric for setPhiLength");
        }
        return this.cursor.phiLength;
    };

    setLoop = (i) => {
        this.cursor.loop = Boolean(i);
        return this.cursor.loop;
    };

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

    setDuration = (i) => {
        if (typeof i === "number") {
            this.cursor.duration = i;
        } else {
            console.error("must pass a numeric for setDuration");
        }
        return this.cursor.duration;
    };

    setColor = (color) => {
        this.cursor.color = color;
        return this.cursor.color;
    }

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

    // Allows the entity to be dropped
    makeDroppable = (outerElId, mass = 2) => {
        let el = this.getEl(outerElId);
        let dynamicBody = `shape: auto; mass: ${mass}; angularDamping: 0.5; linearDamping: 0.5;`;
        el["dynamic-body"] = dynamicBody;
        return outerElId;
    }

    // Disallows the entity to be dropped
    makeUnDroppable = (outerElId) => {
        let el = this.getEl(outerElId);
        //Only makes an item undroppable if it is droppable but is not pushable
        if (el["dynamic-body"] && (!el["force-pushable"] || el["force-pushable"] === "false")) {
            el["dynamic-body"] = null;
        }
        return outerElId;
    }

    // Allows the entity to be pushed
    makePushable = (outerElId, mass = 2) => {
        let el = this.getEl(outerElId);
        let dynamicBody = `shape: auto; mass: ${mass}; angularDamping: 0.5; linearDamping: 0.5;`;
        el["dynamic-body"] = dynamicBody;
        el["force-pushable"] = "true";
        return outerElId;
    }

    // Disallows the entity to be pushed
    makeUnPushable = (outerElId) => {
        let el = this.getEl(outerElId);
        if (el["force-pushable"]) {
            el["dynamic-body"] = null;
            el["force-pushable"] = "false";
        }
        return outerElId;
    }

    // Disallows the entity to be pushed
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

    // Render an Aframe Box Primitive with current Myr settings
    box = (params) => {
        let base = {
            geometry: "primitive: box;",
            id: "box" + this.genNewId(),
            material: `color: ${this.cursor.color};`,
            position: { ...this.cursor.position },
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
        };
        return this.mergeProps(base, params);
    }

    // Render an Aframe circle Primitive with current Myr settings
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

    // Render an Aframe circle Primitive with current Myr settings
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

    // Render an Aframe Text Primitive with current Myr settings
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


    // Render an Aframe dodecahedron with current Myr settings
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

    // Render an Aframe icosahedron with current Myr settings
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

    // Render an Aframe octahedron with current Myr settings
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

    // Render an Aframe Polyhedron with current Myr settings
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

    // Render an Aframe Sphere Primitive with current Myr settings
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

    /*
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

    torusknot = (params) => {
        let base = {
            id: "torKn" + this.genNewId(),
            geometry: "primitive: torusKnot;",
            position: this.cursor.position,
            scale: this.cursor.scale,
            rotation: this.cursor.rotation,
            material: `color: ${this.cursor.color};`,
            p: 2,
            q: 3,
        };
        return this.mergeProps(base, params);
    }

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

    // Render a new Aframe light with current Myr settings
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

    // Animate the Aframe element which is passed as arg
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

    getColor = () => {
        return this.cursor.color;
    };
    getXPos = () => {
        return this.cursor.position.x;
    };
    getYPos = () => {
        return this.cursor.position.y;
    };
    getZPos = () => {
        return this.cursor.position.z;
    };
    getXScale = () => {
        return this.cursor.scale.x;
    };
    getYScale = () => {
        return this.cursor.scale.y;
    };
    getZScale = () => {
        return this.cursor.scale.z;
    };
    getXRotation = () => {
        return this.cursor.rotation.x;
    };
    getYRotation = () => {
        return this.cursor.rotation.y;
    };
    getZRotation = () => {
        return this.cursor.rotation.z;
    };
    getRadius = () => {
        return this.cursor.radius;
    };
    getPhiLength = () => {
        return this.cursor.phiLength;
    };
    getLoop = () => {
        return this.cursor.loop;
    };
    getDuration = () => {
        return this.cursor.duration;
    };
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

    getEl = (outerElId) => {
        if (outerElId.entity) {
            outerElId = outerElId.id;
        }
        return this.els[outerElId];
    }

    /**
    * @summary - Interface for setting an object's parameters in the DOM
    * the idea is the setup an event listener as an almost DOM ready listener.
    *
    * @param {string} outerElId - target
    * @param {string} type - what param to change
    * @param {obj} newParam - changes
    *
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
    * @summary - This creates an entity w shape of object and merges with supplied params
    *
    * @param {string} shape - one of the allowed arguments to this.core()
    * @param {obj} params - arguments to be merged, not guarenteed to be successful
    *
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

    // Return a Entity that can be used to group elements together
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

    // Transfer the object from MYR to the Entity
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
