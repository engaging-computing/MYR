
import React, { Component, Fragment } from 'react';
import 'aframe';
import 'aframe-animation-component';
import 'three-pathfinding/dist/three-pathfinding';
import 'aframe-extras/dist/aframe-extras.min.js';
import 'aframe-physics-system';
import 'aframe-environment-component';
import * as THREE from 'three';

/**
 * @summary - The View component return the aframe representation of the scene. This
 * system utilizes the entity compoent system(ECS) to build objects in the scene from different
 * components.
 */
class View extends Component {

  // This fires off an event when the system is fully rendered.
  componentDidUpdate() {
    // Create the event
    var event = new CustomEvent("myr-view-rendered");

    // Dispatch/Trigger/Fire the event
    document.dispatchEvent(event);

    var el = document.getElementById('rig');
    el.components["movement-controls"].velocity = new THREE.Vector3(0, 0, 0)
  }

  // This renders json to aframe entities
  helper = (ent) => {
    if (ent) {
      let flattened = {
        ...ent,
        position: `${ent.position.x} ${ent.position.y} ${ent.position.z}`,
        scale: `${ent.scale.x} ${ent.scale.y} ${ent.scale.z}`,
        rotation: `${ent.rotation.x} ${ent.rotation.y} ${ent.rotation.z}`
      };
      // If it is group then render children then render parent
      if (ent.group) {
        return (
          <a-entity key={ent.id} {...flattened}>
            {ent.els ? ent.els.map(it => this.helper(it)) : null}
          </a-entity>
        )
      }
      if (ent.text) {
        delete flattened.text; // this takes care of a warning, may not be necessary
        return <a-text key={ent.id} {...flattened}></a-text>;
      }
      return <a-entity key={ent.id} {...flattened}></a-entity>;
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
          look-controls="pointerLockEnabled: true"
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
      <a-entity id="rig"
        debug={true}
        movement-controls={this.props.sceneConfig.showFlyHelper ? "fly:true" : "fly:false"}
        position={this.props.sceneConfig.cameraPosition} >
        <a-entity camera
          look-controls="pointerLockEnabled: true">
          <a-entity cursor
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03;"
            material="color: #CCC; shader: flat;" />
        </a-entity>
      </a-entity>
    );
  }



  /**
  * @summary - Produces the grid on the ground and the coordinate lines
  *
  */
  coordinateHelper = () => {
    if (this.props.sceneConfig.showCoordHelper) {
      return (
        <Fragment>
          <a-grid height="53.33" width="53.33" position="-0.5 -0.26 -0.5" scale="1.5 1.5 1.5" />
          <a-tube path="-35 -0.2 0, 35 -0.2 0" radius="0.05" material="color: red"></a-tube>
          <a-tube path="0 -0.2 -35, 0 -0.2 35" radius="0.05" material="color: blue"></a-tube>
          <a-text
            color="#555"
            rotation="0 0 0"
            position="-0.0005 .1 0"
            side="double"
            align="center"
            value="- X           X +"></a-text>
          <a-text
            color="#555"
            rotation="0 90 0"
            position="0 .1 -0.01"
            side="double"
            align="center"
            value="+ Z          Z -">
          </a-text>
          <a-text
            color="#555"
            rotation="0 90 90"
            position="0 .1 0"
            side="double"
            value=" Y + "></a-text>
        </Fragment>
      );
    } else {
      return null;
    }
  }

  render = () => {
    return (
      <a-scene physics="debug: false; friction: 3; restitution: .3;" embedded debug="false">
        <a-assets>
          <a-mixin id="checkpoint"></a-mixin>
          <a-mixin id="checkpoint-hovered" color="#6CEEB5"></a-mixin>
          <a-img id="reference" src={`${process.env.PUBLIC_URL}/img/coordHelper.jpg`} />
          {this.props.assets ? this.props.assets.map((x, index) => this.assetsHelper(x, index)) : null}
        </a-assets>
        <this.createCam />
        <a-sky color={this.props.sceneConfig.skyColor} />
        <this.coordinateHelper />
        {
          Object.keys(this.props.objects).map(it => {
            return this.helper(this.props.objects[it]);
          })
        }
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
}

export default View;
