import React, { Component } from 'react';
import 'aframe'
// import 'aframe-physics-system';
import 'aframe-physics-components';
import { Entity } from 'aframe-react';
// import { CANNON } from 'cannon';

class View extends Component {

  // This renders json to aframe entities
  helper = (ent, id) => {
    // for now only look one level deep for animations
    var anim, cam;
    if (ent && ent.animation)
      anim = <a-animation {...ent.animation}/>;
    else
      anim = null;

    if (ent && ent.camera){
      if (ent.cursor) {
        cam = <a-camera>
                <a-cursor></a-cursor>
              </a-camera>;
      } else {
        cam = <a-camera />;
      }
      delete ent.camera;
      return <Entity id="cam" key={id} {...ent}>{cam}</Entity>
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

  render = () => {
    return (
      <div id="scene" className="col col-md-8">
        <a-scene physics-world="" embedded>
          <a-assets>
            {this.props.assets ? this.props.assets.map((x, index) => this.assetsHelper(x, index)): null}
            <a-mixin id="box" geometry="primitive: box" material="color: #166678; side: double"
                              physics-body="mass: 5; boundingBox: 2 2 2"></a-mixin>          
          </a-assets>

          <a-entity id="sky"
                    geometry="primitive: sphere; radius: 100"
                    material="color: #74DEED; shader: flat"
                    scale="1 1 -1"></a-entity>
                    
          <a-entity id="ground"
                    geometry="primitive: box; depth: 50; height: 0.1; width: 50"
                    material="color: #2E3837"
                    physics-body="mass: 0; boundingBox: 50 0.1 50" position="0 0 -10"></a-entity>

          <a-entity mixin="box" position="0 10 -10"></a-entity>
          <a-entity id="left-box" mixin="box" position="-2.1 1 -10"></a-entity>
          <a-entity mixin="box" physics-body="angularVelocity: 0 0 60"
                    position="2 1 -10"></a-entity>
          <a-entity id="bullet-box" mixin="box" physics-body="mass: 1; velocity: 0 0 -100"
                    position="2 3 50"></a-entity>

          {this.props.objects ? this.props.objects.map((x, index) => this.helper(x, index)) : null}
        </a-scene>
      </div>
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