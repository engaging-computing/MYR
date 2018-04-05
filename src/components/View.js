import React, { Component } from 'react';
import 'aframe'
import { Entity } from 'aframe-react';

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
        <a-scene embedded>
          <a-assets>
            {this.props.assets ? this.props.assets.map((x, index) => this.assetsHelper(x, index)): null}          
          </a-assets>
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