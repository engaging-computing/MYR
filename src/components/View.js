import React, { Component } from 'react';
import 'aframe';
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
  helper = (ent, id) => {
    // for now only look one level deep for animations
    var anim, cam;
    if (ent && ent.animation) {
      anim = <a-animation {...ent.animation} />;
    } else {
      anim = null;
    }

    if (ent && ent.camera) {
      if (ent.cursor) {
        cam = <a-camera>
          <a-cursor></a-cursor>
        </a-camera>;
      } else {
        cam = <a-camera />;
      }
      delete ent.camera;
      return <Entity id="cam" key={id} {...ent}>{cam}</Entity>;
    }

    return (
      <Entity key={id} {...ent}>
        {anim}
      </Entity>
    );
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
          position="0 1.6 0"
          look-controls // ="pointerLockEnabled: true"
          >
          <a-entity cursor
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03;"
            material="color: #CCC; shader: flat;"></a-entity>
        </a-entity>
      </a-entity>
    );
  }

  basicMoveCam = () => {
    return (
      <a-entity id="rig"
        movement-controls
        position="0 1.6 0">
        <a-entity camera
          position="0 1.6 0"
          look-controls="pointerLockEnabled: true"
          ></a-entity>
      </a-entity>
    );
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
          {this.props.assets ? this.props.assets.map((x, index) => this.assetsHelper(x, index)) : null}
        </a-assets>
        <this.createCam />
        <a-sky color={this.props.sceneConfig.skyColor} ></a-sky>
        {this.props.objects ? this.props.objects.map((x, index) => this.helper(x, index)) : null}
        {/* <a-ocean color="#92E2E2" width="50" depth="50" density="15" speed="2"></a-ocean>
        <a-tube path="-25 25 0, 0 25 0, 25 25 25, 0 -15 0" radius="0.5" material="color: red"></a-tube>
        <a-grid /> */}
        {this.props.sceneConfig.camConfig === 1 ?
          <a-entity position="0 0 0">
            <a-cylinder checkpoint radius="1" height="0.3" position="-25 1 -25" color="#39BB82"></a-cylinder>
            <a-cylinder checkpoint radius="1" height="0.3" position="25 1 25" color="#39BB82"></a-cylinder>
            <a-cylinder checkpoint radius="1" height="0.3" position="-25 1 25" color="#39BB82"></a-cylinder>
            <a-cylinder checkpoint radius="1" height="0.3" position="25 1 -25" color="#39BB82"></a-cylinder>
            <a-cylinder checkpoint radius="1" height="0.1" position="0 10 0" material={{color:"#39BB82", transparent: true, opacity: 0.5, }}></a-cylinder>
          </a-entity> 
          : null}
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