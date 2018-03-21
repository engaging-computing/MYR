class Myr {
  constructor(height, width) {
    this.els = [];
    this.assets = [];
    this.res = {els: this.els, assets: this.assets};
    this.height = height;
    this.width = width;
    this.sceneEl = document.querySelector('a-scene')
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
    }
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
    // eslint-disable-next-line     
    this.camera;
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

  // Render an Aframe Box Primitive with current Myr settings    
  box = (obj) => {
    var el = {
      position: this.position,
      scale: this.scale,
      geometry: {
        primitive: "box",
      },
      material: {
        color: this.getRandomColor()
      },
      rotation: this.rotation
    }
    let merged = {...el, ...obj}
    this.els.push(merged);
    return merged;
  }

  // Render an Aframe Sphere Primitive with current Myr settings  
  sphere = (obj) => {
    var el = {
      color: this.getRandomColor(),
      position: this.position,
      scale: this.scale,
      geometry: {
        primitive: "sphere"
      },
      rotation: this.rotation,
      radius: this.radius
    }
    let merged = {...el, ...obj}
    this.els.push(merged);
    return merged;
  }

  // Render an Aframe circle Primitive with current Myr settings  
  circle = () => {
    var el = {
      color: this.getRandomColor(),
      position: this.position,
      scale: this.scale,
      geometry: {
        primitive: "circle"
      },
      rotation: this.rotation,
      radius: this.radius
    }
    this.els.push(el);
    return el;
  }

  // Render an Aframe circle Primitive with current Myr settings  
  cone = (bottomRadius, topRadius) => {
    var el = {
      color: this.getRandomColor(),
      position: this.position,
      scale: this.scale,
      geometry: {
        primitive: "cone"
      },
      rotation: this.rotation,
      "radius-bottom": bottomRadius,
      "radius-top": topRadius
    }
    this.els.push(el);
    return el;
  }

  // Render an Aframe Triangle Primitive with current Myr settings  
  triangle = () => {
    var el = {
      color: this.getRandomColor(),
      position: this.position,
      scale: this.scale,
      geometry: {
        primitive: "triangle"
      },
      rotation: this.rotation
    }
    this.els.push(el);
    return el;
  }

  // Render an Aframe Text Primitive with current Myr settings  
  text = (v) => {
    var el = {
      color: this.getRandomColor(),
      position: this.position,
      scale: this.scale,
      geometry: {
        primitive: "text"
      },
      rotation: this.rotation,
      value: v
    }
    this.els.push(el);
    return el;
  }

  // Render an Aframe Polyhedron with current Myr settings  
  polyhedron = (i) => {
    var el = {
      color: this.getRandomColor(),
      position: this.position,
      scale: this.scale,
      geometry: {
        primitive: "cylinder"
      },
      rotation: this.rotation,
      "segments-radial": i
    }
    this.els.push(el);
    return el;
  }

  // Render an Aframe dodecahedron with current Myr settings  
  dodecahedron = () => {
    var el = {
      radius: this.radius,
      color: this.getRandomColor(),
      position: this.position,
      scale: this.scale,
      geometry: {
        primitive: "dodecahedron"
      },
      rotation: this.rotation,
    }
    this.els.push(el);
    return el;
  }

  // Render an Aframe icosahedron with current Myr settings  
  icosahedron = () => {
    var el = {
      radius: this.radius,
      color: this.getRandomColor(),
      position: this.position,
      scale: this.scale,
      geometry: {
        primitive: "icosahedron"
      },
      rotation: this.rotation,
    }
    this.els.push(el);
    return el;
  }

  // Render an Aframe octahedron with current Myr settings  
  octahedron = () => {
    var el = {
      radius: this.radius,
      color: this.getRandomColor(),
      position: this.position,
      scale: this.scale,
      geometry: {
        primitive: "octahedron"
      },
      rotation: this.rotation,
    }
    this.els.push(el);
    return el;
  }

  // Render a new Aframe light with current Myr settings  
  light = (i) => {
    var el = {
      color: this.getRandomColor(),
      position: this.position,
      geometry: {
        primitive: "light"
      },
    }
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

    }
    // this.els.push(el);
    outerEl.animation = el;
    return el;
  };

  // MODELS
  addCModel = () => {
    var asset = {
      id: "c-obj",
      src: "/img/c.obj"
    }
    var el = {
      "obj-model": "obj: #c-obj",
      mtl: "c-mtl",
      position: this.position,
      scale: this.scale,
      rotation: this.rotation
    }
    this.els.push(el);
    this.assets.push(asset);
    return el;
  }

}

export default Myr