class Myr {
  constructor(height, width) {
    this.els = [];
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

  moveTo = (x, y, z) => {
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

  box = () => {
    var el = {
      color: this.getRandomColor(),
      position: this.position,
      scale: this.scale,
      geometry: {
        primitive: "box"
      },
      rotation: this.rotation
    }
    this.els.push(el);
    return el;
  }

  // Render an Aframe Sphere Primitive with current Myr settings  
  sphere = () => {
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
    this.els.push(el);
    return el;
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

  // Prism is an alias for Polyhedron
  prism = this.polyhedron

  // Animate the Aframe element which is passed as arg
  animate = (outerEl) => {
    // TODO: need recursion 
    var el = {
      color: this.getRandomColor(),
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





}

export default Myr