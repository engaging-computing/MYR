import React, { Component } from 'react';
import 'aframe'
import { Entity, Scene } from 'aframe-react';

class View extends Component {

  helper(ent, id) {
    return <Entity key={id} geometry={ent.geometry} material={ent.material} position={ent.position} />;
  }
  render() {
    return (
      <div id="scene" className="col-lg-8">
        <Scene embedded >
          {this.props.objects.map((x, index) => this.helper(x, index))}
          <Entity particle-system={{ preset: 'snow' }} />
          <Entity light={{ type: 'point' }} />
          <Entity gltf-model={{ src: 'virtualcity.gltf' }} />
          <Entity text={{ value: 'Hello, WebVR!' }} />
        </Scene>
      </div>
    );
  }
}


var entityModel = [
  {
    geometry: {
      primitive: "box"
    },
    material: {
      color: "red"
    },
    position: {
      x: 5,
      y: 3,
      z: -5
    }
  },
  {
    geometry: {
      primitive: "box"
    },
    material: {
      color: "red"
    },
    position: {
      x: 0,
      y: 3,
      z: -5
    }
  },
  {
    geometry: {
      primitive: "box"
    },
    material: {
      color: "red"
    },
    position: {
      x: -5,
      y: 3,
      z: -5
    }
  }
]

export default View;