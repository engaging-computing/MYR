class Myr {
  constructor(height, width) {
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
    let boxEl = document.createElement('a-box')
    boxEl.setAttribute('material', {
      color: this.getRandomColor()
    });
    boxEl.setAttribute('position', this.position);
    boxEl.setAttribute('scale', this.scale);
    boxEl.setAttribute('rotation', this.rotation);
    this.sceneEl.appendChild(boxEl);
    return boxEl;
  }

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

  animate = (el) => {
    var animEl;
    animEl = document.createElement('a-animation');
    animEl.setAttribute('attribute', 'rotation');
    animEl.setAttribute('dur', '10000');
    animEl.setAttribute('fill', 'forwards');
    animEl.setAttribute('to', '0 360 0');
    animEl.setAttribute('repeat', 'indefinite');
    return el.appendChild(animEl);
  };





}

export default Myr