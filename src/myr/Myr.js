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

  // Render an Aframe Box Primitive with current Myr settings
  box = () => {
    let boxEl = {
      tag: "a-box",
      color: this.getRandomColor(),
      position: this.position,
      scale: this.scale,
      geometry: {
        primitive: "box"
      },
      rotation: this.rotation
    }
    this.els.push(boxEl);
    return boxEl;
  }

  // Render an Aframe Sphere Primitive with current Myr settings  
  sphere = () => {
    let sphereEl = document.createElement('a-sphere')
    sphereEl.setAttribute('material', {
      color: this.getRandomColor()
    });
    sphereEl.setAttribute('position', this.position);
    sphereEl.setAttribute('scale', this.scale);
    sphereEl.setAttribute('rotation', this.rotation);
    sphereEl.setAttribute('radius', this.radius);    
    this.sceneEl.appendChild(sphereEl);
    return sphereEl;
  }

  // Render an Aframe circle Primitive with current Myr settings  
  circle = () => {
    let circleEl = document.createElement('a-sphere')
    circleEl.setAttribute('material', {
      color: this.getRandomColor()
    });
    circleEl.setAttribute('position', this.position);
    circleEl.setAttribute('scale', this.scale);
    circleEl.setAttribute('rotation', this.rotation);
    circleEl.setAttribute('radius', this.radius);    
    this.sceneEl.appendChild(circleEl);
    return circleEl;
  }

  // Render an Aframe circle Primitive with current Myr settings  
  cone = (bottomRadius, topRadius) => {
    let coneEl = document.createElement('a-cone')
    coneEl.setAttribute('material', {
      color: this.getRandomColor()
    });
    coneEl.setAttribute('position', this.position);
    coneEl.setAttribute('scale', this.scale);
    coneEl.setAttribute('rotation', this.rotation);
    coneEl.setAttribute('radius-bottom', bottomRadius);
    coneEl.setAttribute('radius-top', topRadius);        
    this.sceneEl.appendChild(coneEl);
    return coneEl;
  }

  // Render an Aframe Triangle Primitive with current Myr settings  
  triangle = () => {
    let triangleEl = document.createElement('a-triangle')
    triangleEl.setAttribute('material', {
      color: this.getRandomColor()
    });
    triangleEl.setAttribute('position', this.position);
    triangleEl.setAttribute('scale', this.scale);
    triangleEl.setAttribute('rotation', this.rotation);
    this.sceneEl.appendChild(triangleEl);
    return triangleEl;
  }

  // Render an Aframe Text Primitive with current Myr settings  
  text = (v) => {
    let textEl = document.createElement('a-text')
    textEl.setAttribute('color', this.getRandomColor());    
    textEl.setAttribute('position', this.position);
    textEl.setAttribute('scale', this.scale);
    textEl.setAttribute('rotation', this.rotation);
    textEl.setAttribute('value', v);
    this.sceneEl.appendChild(textEl);
    return textEl;
  }

  // Render an Aframe Polyhedron with current Myr settings  
  polyhedron = (i) => {
    let polyEl = document.createElement('a-cylinder')
    polyEl.setAttribute('color', this.getRandomColor());    
    polyEl.setAttribute('position', this.position);
    polyEl.setAttribute('scale', this.scale);
    polyEl.setAttribute('rotation', this.rotation);
    polyEl.setAttribute('segments-radial', i);
    this.sceneEl.appendChild(polyEl);
    return polyEl;
  }

  // Prism is an alias for Polyhedron
  prism = this.polyhedron

  // Animate the Aframe element which is passed as arg
  animate = (el) => {
    var animEl;
    animEl = document.createElement('a-animation');
    animEl.setAttribute('attribute', 'rotation');
    animEl.setAttribute('dur', '10000');
    animEl.setAttribute('fill', 'forwards');
    animEl.setAttribute('to', '0 360 0');
    animEl.setAttribute('repeat', 'indefinite');
    el.appendChild(animEl);
    return animEl;
  };





}

export default Myr