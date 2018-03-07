import React, { Component } from 'react';
import 'aframe'
import { Entity, Scene } from 'aframe-react';

class View extends Component {

  // This renders json to aframe entities
  helper = (ent, id) => (
    <Entity key={id} geometry={ent.geometry} material={ent.material} position={ent.position} />
  )

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