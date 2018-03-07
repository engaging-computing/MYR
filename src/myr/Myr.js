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

  box = (x,y,z) => {
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



}

export default Myr