import React, { Component } from 'react';
import 'aframe'
import { Entity, Scene } from 'aframe-react';

class View extends Component {

  // This renders json to aframe entities
  helper = (ent, id) => {
    // for now only look one level deep for animations
    var anim;
    if (ent.animation)
      anim = <a-animation key={id} material={ent.material} geometry={ent.geometry} color={ent.color} scale={ent.scale} position={ent.position}/>;
    else
      anim = null;

    return (
      <Entity key={id} material={ent.material} geometry={ent.geometry} color={ent.color} scale={ent.scale} position={ent.position}>
        {anim}
      </Entity>
    );
  }

  render() {
    return (
      <div id="scene" className="col-lg-8">
        <Scene embedded >
          {this.props.objects.map((x, index) => this.helper(x, index))}
        </Scene>
      </div>
    );
  }
}

export default View;