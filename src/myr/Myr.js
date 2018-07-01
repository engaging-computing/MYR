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
      let c = {
        // random 5 digit integer 'address'
        id:  this.genNewId(),
        position: this.position,
        scale: this.scale,
        geometry: {
          primitive: type,
        },
        material: {
          color: this.color,
          side: 'double'
        },
        rotation: this.rotation,
        radius: this.radius,
        'radius-bottom': 1,
        'radius-top': 2,
      };
      return c;
    };
    this.genNewId = () => {
      return 'a' + this.counter++;
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
        console.warn(`The ${element} of Myr is being overridden.\n` + 
                     `If this was not intentional consider renaming the function.`);
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
    let el = {
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
    let color, i, letters;
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
    let el = {
      environment: true
    };
    this.els.push(el);
  }

  drop = (outerElId) => {
    this.getEl(outerElId)['dynamic-body'] = {
      shape: 'box',
      mass: 5
    };
    return outerElId;
  }

  push = (outerElId, x, y, z) => {
    // Add an event listener
    document.addEventListener('myr-view-rendered', (e) => {
      let el = document.querySelector('#' + outerElId);
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
  box = (params) => {
    return this.mergeProps('box', params);
  }

  // Render an Aframe Sphere Primitive with current Myr settings  
  sphere = (params) => {
    return this.mergeProps('sphere', params);
  }

  // Render an Aframe circle Primitive with current Myr settings  
  circle = (params) => {
    return this.mergeProps('circle', params);
  }

  // Render an Aframe circle Primitive with current Myr settings  
  cone = (params) => {
    return this.mergeProps('cone', params);
  }

  // Render an Aframe Triangle Primitive with current Myr settings  
  triangle = (params) => {
    return this.mergeProps('triangle', params);
  }

  // Render an Aframe Text Primitive with current Myr settings  
  text = (text, params) => {
    let el = {
      text,
      id: this.genNewId(),
      value: text || "Default Text",
      side: 'double',
      color: this.color,
      width: this.scale.x,
      height: this.scale.y,
      align:"center",
      scale: `${this.scale.x} ${this.scale.y} ${this.scale.z}`,
      position: `${this.position.x} ${this.position.y} ${this.position.z}`
    };
    if (!params || typeof params === 'string') {
      this.els.push(el);
    } else {
      this.els.push({ ...el, ...params });
    }
    return el.id;
  }

  // Render an Aframe Text Primitive with current Myr settings  
  cylinder = (params) => {
    return this.mergeProps('cylinder', params);
  }

  // Render an Aframe Polyhedron with current Myr settings  
  polyhedron = (obj) => {
    let el = this.core('cylinder');
    let geometry = {
      geometry: {
        primitive: 'sphere',
        segmentsWidth: 2,
        segmentsHeight: 8
      }
    };
    if (typeof params === 'string') {
      this.els.push({ ...el, ...geometry });
    } else {
      this.els.push({ ...el, ...geometry, ...obj });
    }
    return el.id;
  }

  // Render an Aframe dodecahedron with current Myr settings  
  dodecahedron = (params) => {
    return this.mergeProps('dodecahedron', params);
  }

  // Render an Aframe icosahedron with current Myr settings  
  icosahedron = (params) => {
    return this.mergeProps('icosahedron', params);
  }

  // Render an Aframe octahedron with current Myr settings  
  octahedron = (params) => {
    return this.mergeProps('octahedron', params);
  }

  ring = (params) => {
    return this.mergeProps('ring', params);
  }

  tetrahedron = (params) => {
    return this.mergeProps('tetrahedron', params);
  }

  torus = (params) => {
    return this.mergeProps('torus', params);
  }

  torusknot = (params) => {
    return this.mergeProps('torusKnot', params);
  }

  // Render a new Aframe light with current Myr settings  
  light = (obj) => {
    let el = {
      color: this.getRandomColor(),
      position: this.position,
      geometry: {
        primitive: 'light'
      },
    };
    this.els.push(el);
    return el;
  }

  // Prism is an alias for Polyhedron
  prism = this.polyhedron

  // Animate the Aframe element which is passed as arg
  animate = (outerElId, duration) => {
    let el = this.getEl(outerElId);
    let anim = {
      property: 'rotation',
      dir: 'alternate',
      to: '0 360 0',
      dur: duration || '1000',
      loop: true
    };
    el.animation = anim;
    return outerElId;
  };

  spin = (outerElId, magnitude = 360, loop = true, duration) => {
    let el = this.getEl(outerElId);
    let anim = {
      dir: 'alternate',
      dur: duration || '1000',
      loop: loop,
      easing: 'linear',
      property: 'rotation',
      from: `${el.rotation.x} ${el.rotation.y} ${el.rotation.z}`,
      to: `0 ${magnitude} 0`,
    };
    el.animation__spin = anim;
    return outerElId;
  };

  yoyo = (outerElId, magnitude = 2, loop = true, duration) => {
    let el = this.getEl(outerElId);
    let anim = {
      property: 'position',
      dir: 'alternate',
      dur: duration || '1000',
      loop: loop,
      from: `${el.position.x} ${el.position.y} ${el.position.z}`,
      to: `${el.position.x} ${el.position.y + magnitude} ${el.position.z}`,
    };
    el.animation__yoyo = anim;
    return outerElId;
  };

  sideToSide = (outerElId, magnitude = 2, loop = true, duration) => {
    let el = this.getEl(outerElId);
    let anim = {
      dir: 'alternate',
      dur: duration || '1000',
      loop: loop,
      property: 'position',
      from: `${el.position.x} ${el.position.y} ${el.position.z}`,
      to: `${el.position.x + magnitude} ${el.position.y} ${el.position.z}`,
    };
    el.animation__sidetoside = anim;
    return outerElId;
  };

  goUp = (outerElId, magnitude = 2, loop = true, duration) => {
    let el = this.getEl(outerElId);
    let anim = {
      dir: 'alternate',
      dur: duration || '1000',
      loop: loop,
      property: 'position',
      from: `${el.position.x} ${el.position.y} ${el.position.z}`,
      to: `${el.position.x} ${el.position.y + magnitude} ${el.position.z}`,
    };
    el.animation__goup = anim;
    return outerElId;
  };

  goDown = (outerElId, magnitude = 2, loop = true, duration) => {
    let el = this.getEl(outerElId);
    let anim = {
      property: 'position',
      dir: 'alternate',
      dur: duration || '1000',
      loop: loop,
      from: `${el.position.x} ${el.position.y} ${el.position.z}`,
      to: `${el.position.x} ${el.position.y - magnitude} ${el.position.z}`,
    };
    el.animation__godown = anim;
    return outerElId;
  };

  goLeft = (outerElId, magnitude = 2, loop = true, duration) => {
    let el = this.getEl(outerElId);
    let anim = {
      property: 'position',
      dir: 'alternate',
      dur: duration || '1000',
      loop: loop,
      from: `${el.position.x} ${el.position.y} ${el.position.z}`,
      to: `${el.position.x + magnitude} ${el.position.y} ${el.position.z}`,
    };
    el.animation__goleft = anim;
    return outerElId;
  };

  goRight = (outerElId, magnitude = 2, loop = true, duration) => {
    let el = this.getEl(outerElId);
    let anim = {
      property: 'position',
      dir: 'alternate',
      dur: duration || '1000',
      loop: loop,
      from: `${el.position.x} ${el.position.y} ${el.position.z}`,
      to: `${el.position.x - magnitude} ${el.position.y} ${el.position.z}`,
    };
    el.animation__goright = anim;
    return outerElId;
  };

  goTowards = (outerElId, magnitude = 2, loop = true, duration) => {
    let el = this.getEl(outerElId);
    let anim = {
      property: 'position',
      dir: 'alternate',
      dur: duration || '1000',
      loop: loop,
      from: `${el.position.x} ${el.position.y} ${el.position.z}`,
      to: `${el.position.x} ${el.position.y} ${el.position.z + magnitude}`,
    };
    el.animation__goleft = anim;
    return outerElId;
  };

  goAway = (outerElId, magnitude = 2, loop = true, duration) => {
    let el = this.getEl(outerElId);
    let anim = {
      property: 'position',
      dir: 'alternate',
      dur: duration || '1000',
      loop: loop,
      to: `${el.position.x} ${el.position.y} ${el.position.z - magnitude}`,
    };
    el.animation__goright = anim;
    return outerElId;
  };

  grow = (outerElId, magnitute = 2, loop = true, duration) => {
    let el = this.getEl(outerElId);
    let anim = {
      property: 'scale',
      dir: 'alternate',
      dur: duration || '1000',
      loop: loop,
      from: `${el.scale.x} ${el.scale.y} ${el.scale.z}`,
      to: `${el.scale.x * magnitute} ${el.scale.y * magnitute} ${el.scale.z * magnitute}`,
    };
    el.animation__grow = anim;
    return outerElId;
  };

  shrink = (outerElId, magnitute = 2, loop = true, duration) => {
    let el = this.getEl(outerElId);
    let anim = {
      property: 'scale',
      dir: 'alternate',
      dur: duration || '1000',
      loop: loop,
      from: `${el.scale.x} ${el.scale.y} ${el.scale.z}`,
      to: `${el.scale.x / magnitute} ${el.scale.y / magnitute} ${el.scale.z / magnitute}`,
    };
    el.animation__shrink = anim;
    return outerElId;
  };

  // MODELS
  addCModel = () => {
    let asset = {
      id: 'c-obj',
      src: '/img/c.obj'
    };
    let el = {
      'obj-model': 'obj: #c-obj',
      mtl: 'c-mtl',
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
    document.addEventListener('myr-view-rendered', (e) => {
      try {
        let el = document.querySelector('#' + outerElId);
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
      let el = document.querySelector('#' + outerElId);
      el.setAttribute(type, newParam);
    } catch (error) {
      let err = Error('syncChange() failed execution\n' +
        'Ensure you are passing the proper id to the method' +
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
  mergeProps = (shape, params) => {
    let el = this.core(shape);
    if (!params || typeof params === 'string') {
      this.els.push(el);
    } else {
      this.els.push({ ...el, ...params });
    }
    return el.id;
  }

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

export default Myr;