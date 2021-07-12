import "aframe";
import "aframe-physics-system";
import Group from "./Group";
import CANNON from "cannon";
import TexturePack from "../components/structural/Textures.js";
import {MaterialType} from "../components/structural/MaterialType.js";
import ModelPack from "../components/structural/Models.js";

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
            texture: "",
            materialType: MaterialType.SPECULAR,
            roughness: 1,
            metalness: 0,
            transparency: 0,
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
            textureColoring: false,
            textureRepeatWidth: 1,
            textureRepeatHeight: 1,
            duration: 1000,
            magnitude: {
                spin: 360,
                fadeOut: 0,
                general: 1
            },
            light: {
                beamAngle: 60,
                decay: 1,
                distance: 0.0,
                intensity: 1.0,
                diffusion: 0.0,
                target: null
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
            texture: "",
            materialType: MaterialType.SPECULAR,
            roughness: 1.0,
            metalness: 0.0,
            transparency: 0,
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
            textureColoring: false,
            textureRepeatWidth: 1,
            textureRepeatHeight: 1,
            duration: 1000,
            magnitude: {
                spin: 360,
                fadeOut: 0,
                general: 1
            },
            light: {
                intensity: 1.0,
                beamAngle: 60,
                diffusion: 0.0,
                decay: 1,
                distance: 0.0,
                target: null
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
            texture: "",
            materialType: MaterialType.SPECULAR,
            roughness: 1.0,
            metalness: 0.0,
            transparency: 0,
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
            textureColoring: false,
            textureRepeatWidth: 1,
            textureRepeatHeight: 1,
            duration: 1000,
            magnitude: {
                spin: 360,
                fadeOut: 0,
                general: 1
            },
            light: {
                intensity: 1.0,
                beamAngle: 60,
                diffusion: 0.0,
                decay: 1,
                distance: 0.0,
                target: null
            }    
        };
    }

    resetTransformationCursor = () => {
        this.cursor = {
            ...this.cursor,
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
        };
    };

    resetAnimationCursor = () => {
        this.cursor = {
            ...this.cursor,
            loop: true,
            duration: 1000,
            magnitude: {
                spin: 360,
                fadeOut: 0,
                general: 1
            }
        };
    };

    resetLightCursor = () => {
        this.cursor.light = {
            intensity: 1.0,
            beamAngle: 60,
            diffusion: 0.0,
            decay: 1,
            distance: 0.0,
            target: null
        };
    };

    genNewId = () => {
        return this.counter++;
    };
    
    /**
     * Sets the transparency of the cursor
     *
     * @param {number} transparency New transparency of the cursor (0-100)
     */
    setTransparency = (transparency = 0) => {
        if(typeof transparency === "number" && transparency <= 100 && transparency >= 0) {
            this.cursor.transparency = transparency / 100;
        } else {
            console.error("setTransparency() either recieved a non numeric value or a value out of range (0-100)");
        }

        return this.cursor.opacity;
    }

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
    setRotation = (x = 0, y = 0, z = 0) => {
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
            case "texture":
                this.setTexture(value);
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
            case "transparency":
                this.setTransparency(value);
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

    setTexture = (texture = "", w = 1, h = 1) => {
        let textures = TexturePack();
        let textureTitle = [...textures.TexturePack.map(obj => obj.title)];
        let textureURL = [...textures.TexturePack.map(obj => obj.url)];
        let urlregex = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

        if (textureURL[textureTitle.indexOf(texture.toLowerCase())] !== undefined) {
            this.cursor.texture = textureURL[textureTitle.indexOf(texture.toLowerCase())];
        }
        else if(urlregex.test(texture) || (texture === "")) {
            this.cursor.texture = texture;
        }
        else {
            console.error("Not a usable texture or URL.");
            throw new Error("Not a usable texture or URL.");
        }
        this.cursor.textureRepeatWidth = w;
        this.cursor.textureRepeatHeight = h;

        return this.cursor.texture;
    }

    setTextureColoring = (i) => {
        this.cursor.textureColoring = Boolean(i);
        return this.cursor.textureColoring;
    }

    /**
     * Changes the material type of the cursor.
     * 
     * @param {string} materialType 
     * @returns 
     */
    setMaterialType = (materialType = MaterialType.SPECULAR) => {
        let validMaterial = false;
        for(let key in MaterialType) {
            validMaterial = MaterialType[key] === materialType;
            if(validMaterial) break;
        }
        if(!validMaterial) {
            throw new Error(`${materialType} is not a valid material type!`);
        }

        this.cursor.materialType = materialType;
        return this.cursor.materialType;
    }

    /**
     * Changes the roughness of the cursor within a range of 0 to 1.
     * Custom roughness only applies to objects with MaterialType.PHYSICAL.
     * 
     * @param {number} roughness 
     * @returns the roughness of the cursor
     */
    setRoughness = (roughness) => {
        if(roughness < 0 || roughness > 1) {
            throw new Error("Roughness must be between 0.0 and 1.0!");
        }
        this.cursor.roughness = roughness;
        return this.cursor.roughness;
    }

    /**
     * Changes the metalness of the cursor within a range of 0 to 1.
     * Custom metalness only applies to objects with MaterialType.PHYSICAL.
     * 
     * @param {number} metalness 
     * @returns the metalness of the cursor
     */
    setMetalness = (metalness) => {
        if(metalness < 0 || metalness > 1) {
            throw new Error("Metalness must be between 0.0 and 1.0!");
        }
        this.cursor.metalness = metalness;
        return this.cursor.metalness;
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
            id: "box" + this.genNewId(),
            geometry: "primitive: box;",
            position: { ...this.cursor.position },
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
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
            id: "circ" + this.genNewId(),
            geometry: `primitive: circle; radius: ${this.cursor.radius}; theta-length: ${this.cursor.phiLength};`,
            position: this.cursor.position,
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
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
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
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
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
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
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
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
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
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
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
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
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
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
            plane: true,
            geometry: `primitive: plane; height: 1; width: 1; phi-length: ${this.cursor.phiLength};`,
            position: this.cursor.position,
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
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
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
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
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
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
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
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
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
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
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
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
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
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
            rotation: this.cursor.rotation,
            p: 2,
            q: 3,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
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
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
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
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; repeat: ${this.cursor.textureRepeatWidth + " " + this.cursor.textureRepeatHeight}; opacity: ${1 - this.cursor.transparency};`,
            materialinfo: {
                type: this.cursor.materialType,
                roughness: this.cursor.roughness,
                metalness: this.cursor.metalness,
            },
        };
        return this.mergeProps(base, params);
    }

    /**
     * Load and render a custom glTF model with current Myr settings
     * 
     * @param {string} src Valid MYR model ID or valid glTF URL
     * @param {*} params !!!DESCRIPTION NEEDED!!!
     */
    gltfModel = (src, params) => {
        let id = `gltf-model-${this.genNewId()}`;

        let models = ModelPack();
        let urlregex_https = /^(https:)([/|.|\w|\s|-])*\.(?:glb|gltf)/;
        let urlregex_http = /^(http:)([/|.|\w|\s|-])*\.(?:glb|gltf)/;

        if(models.ModelPack.has(src)) {
            src = models.ModelPack.get(src).model;
        } else if(!urlregex_https.test(src)) {
            let error = `Unable to load model (${src}).\n`;
            if(urlregex_http.test(src)) {
                error += "\tHTTP URLs not supported. Please use HTTPS.";
            } else {
                error += "\tInvalid URL.";
            }
            console.error(error);
            throw new Error(error);
        }

        // If a standard github URL, try to refactor it to the raw file URL
        src = src.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/").replace("?raw=true", "");
        
        let asset = {
            id: id,
            src: src,
        };
        let base = {
            id: id,
            "gltf-Model": `#${id}`,
            position: { ...this.cursor.position },
            rotation: this.cursor.rotation,
            scale: this.cursor.scale,
            material: ((this.cursor.texture === "" || this.cursor.textureColoring) ? `color: ${this.cursor.color};` : "color: white;") + `side: double; src: ${this.cursor.texture}; opacity: ${1 - this.cursor.transparency};`
        };

        this.assets.push(asset);
        return this.mergeProps(base, params);
    }

    ambientLight  = (params) => {
        let base = {
            id: "lgt" + this.genNewId(),
            light: {
                state:`
      type: ambient; 
      color: ${this.cursor.color};
      intensity: ${this.cursor.light.intensity};`,
                type: "ambient",
            },	  
            color: this.cursor.color,

            position: this.cursor.position,
            scale: {x:1,y:1,z:1},
            rotation: this.cursor.rotation,
        };	
        return this.mergeProps(base, params);
    }

    directionalLight  = (params) => {
        let base = {
            id: "lgt" + this.genNewId(),
            light: {
                state:`
      type: directional;
      color: ${this.cursor.color};
      intensity: ${this.cursor.light.intensity};`,
                target: this.cursor.light.target,
                type: "directional",
            },	  
            color: this.cursor.color,
            position: this.cursor.position,
            scale: {x:1,y:1,z:1},
            rotation: this.cursor.rotation,
        };	
        return this.mergeProps(base, params);
    }
    
    spotLight  = (params) => {
        let base = {
            id: "lgt" + this.genNewId(),
            light: {
                state:`
      type: spot;
      angle: ${this.cursor.light.beamAngle};
      decay: ${this.cursor.light.decay};
      distance: ${this.cursor.light.distance};
      intensity: ${this.cursor.light.intensity};
      penumbra: ${this.cursor.light.diffusion};
      color: ${this.cursor.color};`,
                type: "spot",
                angle: this.cursor.light.beamAngle,
                target: this.cursor.light.target
            },	  
            color: this.cursor.color,
            position: this.cursor.position,
            scale:  {x:1,y:1,z:1},
            rotation:this.cursor.rotation
        };	
        return this.mergeProps(base, params);
    }

    pointLight  = (params) => {
        let base = {
            id: "lgt" + this.genNewId(),
            light: {
                state:`
      type: point;
      angle: ${this.cursor.light.beamAngle};
      decay: ${this.cursor.light.decay};
      distance: ${this.cursor.light.distance};
      intensity: ${this.cursor.light.intensity};
      penumbra: ${this.cursor.light.diffusion};
      color: ${this.cursor.color};`,
                type: "point",
            },	 
            color: this.cursor.color,
            position: this.cursor.position,
            scale: {x:1,y:1,z:1},
            rotation: this.cursor.rotation,
        };	
        return this.mergeProps(base, params);
    }

    //secondColor == groundColor
    hemisphereLight  = (secondColor="red",params) => {
        let base = {
            id: "lgt" + this.genNewId(),
            light: {
                state:`
      type: hemisphere;
      intensity: ${this.cursor.light.intensity};
      color: ${this.cursor.color};
      groundColor: ${secondColor};`,
                type: "hemisphere",
                secondColor: secondColor
            },	  
            color: this.cursor.color,
            position: this.cursor.position,
            scale: {x:1,y:1,z:1},
            rotation: this.cursor.rotation,
        };	
        return this.mergeProps(base, params);
    }
    
    //beamAngle == angle
    setBeamAngle=(beamAngle = 60)=>{
        if(typeof beamAngle === "number"){
            this.cursor.light.beamAngle = beamAngle; 
        }else{
            console.error("must pass a numeric for setBeamAngle");
        }
        
    }
    
    setDecay = (decay = 0.0) =>{
        if(typeof decay === "number"){
            this.cursor.light.decay = decay;
        }else{
            console.error("must pass a numeric for setDecay");
        }
    }
    
    setDistance = (distance=0.0) =>{
        if(typeof distance === "number"){
            this.cursor.light.distance = distance; 
        }else{
            console.error("must pass a numeric for setDistance");
        }
    }
    setIntensity = (intensity = 1.0) =>{
        if(typeof intensity === "number"){
            this.cursor.light.intensity = intensity;
        }else{
            console.error("must pass a numeric for setIntesity");
        }
    }
    
    //diffusion == penumbra
    setDiffusion = (diffusion = 0.0) => {
        if(typeof diffusion === "number"){
            this.cursor.light.diffusion = diffusion;
        }else{
            console.error("must pass a numeric for setDiffusion");
        }
    }

    setLightTarget = (x = 0, y = 0, z = 0) => {
        if(typeof x === "number" && typeof y === "number" && typeof z === "number"){
            this.cursor.light.target = {
                x: x,
                y: y,
                z: z
            }; 
        }else{
            console.error("must pass a numeric for setLightTarget");
        }
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
        if(el.id.includes("lgt")){
            let type = el.light.state.split(/\s|;/).filter(Boolean)[1];
            let anim;
            if(type === "spot"){
                anim = `
                property: light.angle;
                from: 60;
                to: ${magnitude};
                dur: ${this.cursor.duration};
                dir: alternate;
                loop: ${Boolean(loop)};
            `;
            }else if(type === "point"){
                anim =`
                property: light.distance;
                from: 10;
                to: ${magnitude};
                dur: ${this.cursor.duration};
                dir: alternate;
                loop: ${Boolean(loop)};
                `;
            }
            el.animation__fadein = anim;
            return outerElId;
        }
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

        if(el.id.includes("lgt")){
            let type = el.light.state.split(/\s|;/).filter(Boolean)[1];
            let anim;
            if(type === "spot"){
                anim = `
                property: light.angle;
                from: ${magnitude};
                to:  10;
                dur: ${this.cursor.duration};
                dir: alternate;
                loop: ${Boolean(loop)};
            `;
            }else if(type === "point"){
                anim =`
                property: light.distance;
                from:${magnitude};
                to: 10;
                dur: ${this.cursor.duration};
                dir: alternate;
                loop: ${Boolean(loop)};
                `;
            }
            el.animation__fadein = anim;
            return outerElId;
        }

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
        //if the element is light. Unlike normal object, this will alter intensity of light
        if(el.id.includes("lgt")){
            let anim = `
            property: light.intensity;
            from: 1;
            to: ${magnitude};
            dur: ${this.cursor.duration};
            dir: alternate;
            loop: ${Boolean(loop)};
          `;
            el.animation__fadein = anim;
            return outerElId;
        }
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
        //if the element is light. Unlike normal object, this will alter intensity of light
        if(el.id.includes("lgt")){
            let anim = `
            property: light.intensity;
            from: 0;
            to: ${magnitude};
            dur: ${duration};
            dir: alternate;
            loop: ${Boolean(loop)};
          `;
            el.animation__fadein = anim;
            return outerElId;
        }
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

    colourNameToHex=(colour)=>
    {
        let colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
            "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
            "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
            "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
            "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
            "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
            "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff","gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
            "honeydew":"#f0fff0","hotpink":"#ff69b4","indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
            "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
            "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
            "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6","magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
            "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5","navajowhite":"#ffdead","navy":"#000080",
            "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
            "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
            "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1","saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
            "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0","violet":"#ee82ee","wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5","yellow":"#ffff00","yellowgreen":"#9acd32"};

        if (typeof colours[colour.toLowerCase()] !== "undefined"){
            return colours[colour.toLowerCase()];
        }
        return false;
    }
    colorShift = (outerElId, color) => {
        let el = this.getEl(outerElId);
        //if the element is light
        if(String(el.id).includes("lgt")){
            let split = el.light.state.split(/\s|;/).filter(Boolean);
            let colorIndex = split.indexOf("color:")+1;
            let baseCol = split[colorIndex];
            if(this.colourNameToHex(baseCol)!==false){
                baseCol = this.colourNameToHex(baseCol);
            }
            if(this.colourNameToHex(color) !== false){
                color = this.colourNameToHex(color);
            }
            let anim = `property: light.color;
            from: ${baseCol};
            to: ${color};
            dur: ${this.cursor.duration};
            dir: alternate;
            loop: ${Boolean(this.cursor.loop)};
            type: color;`;
            el.animation__color = anim;
            return outerElId;
        }
        //if the element is group
        if (String(el.id).includes("grp")) {
            for (let i in el.els) {
                let innerEl = el.els[i];
                //innerEl.material.split(/\s|;/) returns an array of strings separated by " " and ";",
                //color is always its first attribute (after "color: ")
                let anim = `property: components.material.material.color;
            from: ${(innerEl.material.split(/\s|;/))[1]};
            to: ${color};
            dur: ${this.cursor.duration};
            dir: alternate;
            loop: ${Boolean(this.cursor.loop)};
            isRawProperty: true;
            type: color;`;
                innerEl.animation__color = anim;

            }
            return outerElId;
        }
    
        const mat = el.material.split(/\s|;/);
        let anim = `property: components.material.material.color;
        from: ${mat[mat.indexOf("color:")+1]};
        to: ${color};
        dur: ${this.cursor.duration};
        dir: alternate;
        loop: ${Boolean(this.cursor.loop)};
        isRawProperty: true;
        type: color;`;
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
     * Gets the current texture of the cursor
     */
    getTexture = () => {
        let textures = TexturePack();
        let textureTitle = [...textures.TexturePack.map(obj => obj.title)];
        let textureURL = [...textures.TexturePack.map(obj => obj.url)];
        let returnTexture = textureTitle[textureURL.indexOf(this.cursor.texture)];

        if(returnTexture === undefined){
            returnTexture = this.cursor.texture;
        }

        return returnTexture;
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
