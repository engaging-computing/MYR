class Myr {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.sceneEl = document.querySelector('a-scene')
  }

  box = (x,y,z) => {
    let boxEl = document.createElement('a-box')
    boxEl.setAttribute('position', {x: x, y: y, z: z})
    boxEl.setAttribute('material', {color: 'blue'})
    this.sceneEl.appendChild(boxEl)
    return boxEl
  }

}

export default Myr