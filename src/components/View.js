import React, { Component } from 'react';
import 'aframe'
import { Entity, Scene } from 'aframe-react';

class View extends Component {

  // This renders json to aframe entities
  helper = (ent, id) => {
    // for now only look one level deep for animations
    var anim, cam;
    if (ent && ent.animation)
      anim = <a-animation {...ent.animation}/>;
    else
      anim = null;

    if (ent && ent.camera)
      cam = <a-camera />;
    else
      cam = null;

    return (
      <Entity key={id} {...ent}>
        {anim}
        {cam}
      </Entity>
    );
  }

  render = () => {
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