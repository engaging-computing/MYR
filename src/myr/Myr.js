import 'aframe';
import 'aframe-physics-system';
// eslint-disable-next-line
import CANNON from 'cannon';

class Myr {
  constructor(height, width) {
    this.els = [];
    this.assets = [];
    this.res = {els: this.els, assets: this.assets};
    this.height = height;
    this.width = width;
    this.sceneEl = document.querySelector('a-scene');
    this.position = {
      x: 0,
      y: 0,
      z: -2
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
        id: 'a' + (Math.floor(Math.random()*90000) + 10000),
        position: this.position,
        scale: this.scale,
        geometry: {
          primitive: type,
        },
        material: {
          color: "red"
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
      this.setCamera(x,y,z);
    } 
    this.camera.cursor = true;
  };

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

  drop = (el) => {
    el["dynamic-body"] = {
      shape: "box",
      mass: 5
    };
  }

  push = (outerEl) => {
    // Add an event listener
    document.addEventListener("myr-view-rendered", (e) => {
      var el = document.querySelector("#" + outerEl.id);
      if (!el) {
        return;
      } 
      el.addEventListener('body-loaded', () => {
        var impulse = new CANNON.Vec3(-1, 0, 0);
        var coord = el.getAttribute('position');
        var rel = new CANNON.Vec3().copy(coord);
        el.body.applyImpulse(impulse, rel);
      });
    });
  }

  // Render an Aframe Box Primitive with current Myr settings    
  box = (obj) => {
    var el = this.core("box");
    let merged = {...el, ...obj};
    this.els.push(merged);
    return merged;
  }

  // Render an Aframe Sphere Primitive with current Myr settings  
  sphere = (obj) => {
    var el = this.core("sphere");
    let merged = {...el, ...obj};
    this.els.push(merged);
    return merged;
  }

  // Render an Aframe circle Primitive with current Myr settings  
  circle = (obj) => {
    var el = this.core("circle");
    let merged = {...el, ...obj};
    this.els.push(merged);
    return merged;
  }

  // Render an Aframe circle Primitive with current Myr settings  
  cone = (obj) => {
    var el = this.core("cone");
    let merged = {...el, ...obj};
    this.els.push(merged);
    return merged;
  }

  // Render an Aframe Triangle Primitive with current Myr settings  
  triangle = (obj) => {
    var el = this.core("triangle");
    let merged = {...el, ...obj};
    this.els.push(merged);
    return merged;
  }

  // Render an Aframe Text Primitive with current Myr settings  
  text = (obj) => {
    var el = this.core("text");
    let merged = {...el, ...obj};
    this.els.push(merged);
    return merged;
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
    let merged = {...el, ...obj};
    this.els.push(merged);
    return merged;
  }

  // Render an Aframe dodecahedron with current Myr settings  
  dodecahedron = (obj) => {
    var el = this.core("dodecahedron");
    let merged = {...el, ...obj};
    this.els.push(merged);
    return merged;
  }

  // Render an Aframe icosahedron with current Myr settings  
  icosahedron = (obj) => {
    var el = this.core("icosahedron");
    let merged = {...el, ...obj};
    this.els.push(merged);
    return merged;
  }

  // Render an Aframe octahedron with current Myr settings  
  octahedron = (obj) => {
    var el = this.core("octahedron");
    let merged = {...el, ...obj};
    this.els.push(merged);
    return merged;
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
  animate = (outerEl) => {
    // TODO: need recursion 
    var el = {
      // color: this.getRandomColor(),
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
    // this.els.push(el);
    outerEl.animation = el;
    return el;
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
}

export default Myr;