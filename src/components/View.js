import React, { Component } from 'react';
import 'aframe';
import 'aframe-animation-component';
import 'three-pathfinding/dist/three-pathfinding';
import 'aframe-extras/dist/aframe-extras.min.js';
import 'aframe-physics-system';
import 'aframe-environment-component';
import { Entity } from 'aframe-react';


/**
* @summary - The View component return the aframe representation of the scene. This 
* system utilizes the entity compoent system(ECS) to build objects in the scene from different 
* components. 
*/
class View extends Component {

  // This renders json to aframe entities
  helper = (ent) => {
    // for now only look one level deep for animations
    if (ent) {
      let flattened = {
        ...ent, 
        position: `${ent.position.x} ${ent.position.y} ${ent.position.z}`,
        scale: `${ent.scale.x} ${ent.scale.y} ${ent.scale.z}`,
        rotation: `${ent.rotation.x} ${ent.rotation.y} ${ent.rotation.z}`    
      };
      if (ent.text) {
        return <a-text key={ent.id} {...flattened}></a-text>;
      } else {
        return <a-entity key={ent.id} {...flattened}></a-entity>;
      }
    }
  }

  assetsHelper = (asset, i) => {
    return (
      <a-asset-item key={asset.id} id={asset.id} src={asset.src}></a-asset-item>
    );
  }

  createCam = () => {
    switch (this.props.sceneConfig.camConfig) {
      case 0:
        return this.basicMoveCam();
      case 1:
        return this.checkpointCam();
      default:
        return this.basicMoveCam();
    }
  }

  checkpointCam = () => {
    return (
      <a-entity id="rig" movement-controls="controls: checkpoint" checkpoint-controls="mode: animate">
        <a-entity camera
          position={this.props.sceneConfig.cameraPosition}
          look-controls // ="pointerLockEnabled: true"
        >
          <a-entity cursor
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03;"
            material="color: #CCC; shader: flat;" />
        </a-entity>
      </a-entity>
    );
  }

  basicMoveCam = () => {
    return (
      <Entity
        id="rig"
        movement-controls
        position={this.props.sceneConfig.cameraPosition}>
        <Entity
          camera
          position={this.props.sceneConfig.cameraPosition}
          look-controls // ="pointerLockEnabled: true"
        />
      </Entity>
    );
  }

  skyHelper = () => {
    if (this.props.sceneConfig.showCoordHelper) {
      return <a-sky rotation="0 270 0" src="#reference" />;
    } else {
      return <a-sky color={this.props.sceneConfig.skyColor} />;
    }
  }

  // Need a navmap
  // navMeshCam = () => {
  //   return (
  //     <a-entity id="rig" movement-controls="constrainToNavMesh: true">
  //       <a-entity camera
  //         position="0 1.6 0"
  //         look-controls="pointerLockEnabled: true">
  //       </a-entity>
  //     </a-entity>
  //   );
  // }

  render = () => {
    return (
      <a-scene physics="debug: false; friction: 3; restitution: .1" embedded debug="false">
        <a-assets>
          <a-mixin id="checkpoint"></a-mixin>
          <a-mixin id="checkpoint-hovered" color="#6CEEB5"></a-mixin>
          <a-img id="reference" src={`${process.env.PUBLIC_URL}/img/coordHelper.jpg`} />
          {this.props.assets ? this.props.assets.map((x, index) => this.assetsHelper(x, index)) : null}
        </a-assets>
        <this.createCam />
        <this.skyHelper />
        {this.props.objects ? this.props.objects.map(it => this.helper(it)) : null}
        {/* <a-ocean color="#ff3333" width="50" depth="50" density="15" speed="2"></a-ocean> */}
        {/* <a-tube path="-25 25 0, 0 25 0, 25 25 25, 0 -15 0" radius="0.5" material="color: red"></a-tube> */}
        {/* <a-grid /> */}
        {this.props.sceneConfig.camConfig === 1 ?
          <a-entity position="0 0 0">
            <a-cylinder checkpoint radius="1" height="0.3" position="-25 1 -25" color="#39BB82"></a-cylinder>
            <a-cylinder checkpoint radius="1" height="0.3" position="25 1 25" color="#39BB82"></a-cylinder>
            <a-cylinder checkpoint radius="1" height="0.3" position="-25 1 25" color="#39BB82"></a-cylinder>
            <a-cylinder checkpoint radius="1" height="0.3" position="25 1 -25" color="#39BB82"></a-cylinder>
            <a-circle checkpoint radius="1" rotation="90 0 0" position="0 10 0" color="#39BB82"></a-circle>
          </a-entity>
          : null
        }
      </a-scene>
    );
  }

  componentDidUpdate() {
    // Create the event
    var event = new CustomEvent("myr-view-rendered");

    // Dispatch/Trigger/Fire the event
    document.dispatchEvent(event);
  }
}

export default View;