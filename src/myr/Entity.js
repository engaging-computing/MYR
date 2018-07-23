
class Entity {
  constructor(originalMyr) {
    this.entity = true;
    this.counter = 0;
    this.els = [];
    this.color = 'red';
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
    this.myr = originalMyr;
  }

  attach = (id) => {
    let base = {
      position: this.position,
      scale: this.scale,
      rotation: this.rotation,
    }
    this.els.push({ ...this.myr.transfer(id), ...base });
    console.log(id);
  }

  setPosition = (x = 0, y = 1, z = 0) => {
    this.position = {
      x: x,
      y: y,
      z: z
    };
  }

  entObj = () => {
    return {
      entity: true,
      els: this.els
    };
  }

}

export default Entity;
