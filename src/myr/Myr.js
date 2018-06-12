import 'aframe';
import 'aframe-physics-system';
// eslint-disable-next-line
import CANNON from 'cannon';

class Myr {
  constructor() {
    this.counter = 0;
    this.baseEls = [];
    this.els = [];
    this.assets = [];
    this.res = { els: this.els, assets: this.assets };
    this.color = 'red';
    this.sceneEl = document.querySelector('a-scene');
    this.position = {
      x: 0,
      y: 0,
      z: 0
    };
    this.scale = {
      x: 1,
      y: 1,
      z: 1
    };
    this.rotation = {
      x: 0,
      y: 0,
      z: 0
    };
    this.radius = 1;
    // all entities share certain attributes
    this.core = (type) => {
      var c = {
        // random 5 digit integer "address"
        id: 'a' + this.counter++,
        position: this.position,
        scale: this.scale,
        geometry: {
          primitive: type,
        },
        material: {
          color: this.color,
          side: "double"
        },
        rotation: this.rotation,
        radius: this.radius,
        "radius-bottom": 1,
        "radius-top": 2,
        value: "hello",
        // "dynamic-body":"shape: box"
      };
      return c;
    };
  }

  /**
  * @summary - init creates and binds the myr object to the window
  * 
  * @param [{}] objs - these are the base objects for this object 
  * 
  */
  init = (objs) => {
    this.baseEls = objs || [];
    if (objs) {
      this.els = this.els.concat(objs);
      this.counter = objs.length;
    }

    // Get all the function names of the Myr(this) class
    let funs = Object.getOwnPropertyNames(this).filter((p) => {
      return typeof this[p] === 'function';
    });

    // For each function bind it to the window
    funs.forEach(element => {
      // If a collision is detected then do not override and warn
      if (window.hasOwnProperty(element)) {
        console.warn(`The ${element} of Myr is being overridden. 
                      If this was not intentional consider renaming the function.`);
      } else {
        // Collision free so we can bind to window
        window[element] = this[element];
      }
    });
  }

  /**
  * @summary - Reset this.els to the base elements supplied to the constuctor
  */
  reset = () => {
    // add the base elements and then calculate the offset to user defined objects
    this.counter = this.baseEls ? this.baseEls.length : 0;

    // Reset base params, we might be able to merge two objects later
    this.color = 'red';
    this.position = { x: 0, y: 0, z: 0 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: 0, z: 0 };
    this.radius = 1;
    // restore the base objects of the scene
    this.els = [].concat(this.baseEls);
  }

  setPosition = (x, y, z) => {
    return this.position = {
      x: x,
      y: y,
      z: z
    };
  };

  setScale = (x, y, z) => {
    return this.scale = {
      x: x,
      y: y,
      z: z
    };
  };

  setRotation = (x, y, z) => {
    return this.rotation = {
      x: x,
      y: y,
      z: z
    };
  };

  setRadius = (i) => {
    return this.radius = i;
  };

  setCamera = (x, y, z) => {
    var el = {
      position: {
        x: x,
        y: y,
        z: z
      },
      camera: true
    };
    if (!this.camera) {
      this.els.push(el);
    }
    this.camera = el;
  };

  setCursor = (x, y, z) => {
    if (!this.camera) {
      this.setCamera(x, y, z);
    }
    this.camera.cursor = true;
  };

  setColor = (color) => {
    this.color = color;
  }

  getRandomColor = () => {
    var color, i, letters;
    letters = '0123456789ABCDEF';
    color = '#';
    i = 0;
    while (i < 6) {
      color += letters[Math.floor(Math.random() * 16)];
      i++;
    }
    return color;
  }

  environment = (obj) => {
    var el = {
      environment: true
    };
    this.els.push(el);
  }

  drop = (outerElId) => {
    this.getEl(outerElId)['dynamic-body'] = {
      shape: "box",
      mass: 5
    };
    return outerElId;
  }

  push = (outerElId, x, y, z) => {
    // Add an event listener
    document.addEventListener("myr-view-rendered", (e) => {
      let el = document.querySelector("#" + outerElId);
      if (!el) {
        return;
      }
      el.addEventListener('body-loaded', () => {
        el.body.applyImpulse(
          /* impulse */        new CANNON.Vec3(x, y, z),
          /* world position */ new CANNON.Vec3().copy(el.object3D.position)
        );
      });
    });
    return outerElId;
  }

  // Render an Aframe Box Primitive with current Myr settings    
  box = (obj) => {
    var el = this.core("box");
    let merged = { ...el, ...obj };
    this.els.push(merged);
    return el.id;
  }

  // Render an Aframe Sphere Primitive with current Myr settings  
  sphere = (obj) => {
    var el = this.core("sphere");
    let merged = { ...el, ...obj };
    this.els.push(merged);
    return el.id;
  }

  // Render an Aframe circle Primitive with current Myr settings  
  circle = (obj) => {
    var el = this.core("circle");
    let merged = { ...el, ...obj };
    this.els.push(merged);
    return el.id;
  }

  // Render an Aframe circle Primitive with current Myr settings  
  cone = (obj) => {
    var el = this.core("cone");
    let merged = { ...el, ...obj };
    this.els.push(merged);
    return el.id;
  }

  // Render an Aframe Triangle Primitive with current Myr settings  
  triangle = (obj) => {
    var el = this.core("triangle");
    let merged = { ...el, ...obj };
    this.els.push(merged);
    return el.id;
  }

  // Render an Aframe Text Primitive with current Myr settings  
  text = (obj) => {
    var el = this.core("text");
    let merged = { ...el, ...obj };
    this.els.push(merged);
    return el.id;
  }

  // Render an Aframe Text Primitive with current Myr settings  
  cylinder = (obj) => {
    var el = this.core("cylinder");
    let merged = { ...el, ...obj };
    this.els.push(merged);
    return el.id;
  }

  // Render an Aframe Polyhedron with current Myr settings  
  polyhedron = (obj) => {
    var el = {
      color: this.getRandomColor(),
      position: this.position,
      scale: this.scale,
      geometry: {
        primitive: "cylinder"
      },
      rotation: this.rotation,
      "segments-radial": obj.n
    };
    let merged = { ...el, ...obj };
    this.els.push(merged);
    return el.id;
  }

  // Render an Aframe dodecahedron with current Myr settings  
  dodecahedron = (obj) => {
    var el = this.core("dodecahedron");
    let merged = { ...el, ...obj };
    this.els.push(merged);
    return el.id;
  }

  // Render an Aframe icosahedron with current Myr settings  
  icosahedron = (obj) => {
    var el = this.core("icosahedron");
    let merged = { ...el, ...obj };
    this.els.push(merged);
    return el.id;
  }

  // Render an Aframe octahedron with current Myr settings  
  octahedron = (obj) => {
    var el = this.core("octahedron");
    let merged = { ...el, ...obj };
    this.els.push(merged);
    return el.id;
  }

  ring = (obj) => {
    var el = this.core("ring");
    let merged = { ...el, ...obj };
    this.els.push(merged);
    return el.id;
  }

  // Render a new Aframe light with current Myr settings  
  light = (obj) => {
    var el = {
      color: this.getRandomColor(),
      position: this.position,
      geometry: {
        primitive: "light"
      },
    };
    this.els.push(el);
    return el;
  }

  // Prism is an alias for Polyhedron
  prism = this.polyhedron

  // Animate the Aframe element which is passed as arg
  animate = (outerElId) => {
    // TODO: need recursion 
    var el = {
      position: this.position,
      scale: this.scale,
      geometry: {
        primitive: "animation"
      },
      rotation: this.rotation,
      dur: '10000',
      fill: 'forwards',
      to: '0 360 0',
      repeat: 'indefinite',

    };
    this.getEl(outerElId).animation = el;
    return outerElId;
  };

  // MODELS
  addCModel = () => {
    var asset = {
      id: "c-obj",
      src: "/img/c.obj"
    };
    var el = {
      "obj-model": "obj: #c-obj",
      mtl: "c-mtl",
      position: this.position,
      scale: this.scale,
      rotation: this.rotation
    };
    this.els.push(el);
    this.assets.push(asset);
    return el;
  }

  getEl = (outerElId) => {
    return this.els[this.getIndex(outerElId)];
  }

  getIndex = (outerElId) => {
    return Number(outerElId.substr(1, outerElId.length));
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
    document.addEventListener("myr-view-rendered", (e) => {
      try {
        let el = document.querySelector("#" + outerElId);
        el.setAttribute(type, newParam);
      } catch (error) {
        return Error('change() failed execution' +
          'Ensure you are passing the proper id to the method' +
          `Error msg: ${error}`);
      }
    });
  }

  syncChange = (outerElId, type, newParam) => {
    try {
      let el = document.querySelector("#" + outerElId);
      el.setAttribute(type, newParam);
    } catch (error) {
      let err = Error('syncChange() failed execution\n' +
        'Ensure you are passing the proper id to the method' +
        `Error msg: ${error}`);
      console.error(err);
      return err;
    }
  }

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

export default Myr;