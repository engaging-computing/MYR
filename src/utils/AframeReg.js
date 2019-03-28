import AFRAME from 'aframe';
import * as THREE from 'three';

AFRAME.registerComponent('force-pushable', {
  schema: {
    force: { default: 10 }
  },
  init: function () {
    this.pStart = new THREE.Vector3();
    this.sourceEl = this.el.sceneEl.querySelector('#rig');
    this.el.addEventListener('click', this.forcePush.bind(this));
  },
  forcePush: function () {
    let force,
      el = this.el,
      pStart = this.pStart.copy(this.sourceEl.getAttribute('position'));

    // Compute direction of force, normalize, then scale.
    force = el.body.position.vsub(pStart);
    force.normalize();
    force.scale(this.data.force, force);

    el.body.applyImpulse(force, el.body.position);
  }
});
