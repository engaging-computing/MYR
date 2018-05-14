import React from 'react';
import Editor from '../components/Editor';
import View from '../components/View';
import Terminal from '../components/Terminal';
import PropTypes from 'prop-types';


export default function Ide({ text, objects, actions, assets, user, scene, errors, sceneActions }) {
  return (
    <div className="row no-gutters">
      <div id="interface" className="col-12 col-md-4">
        <Editor actions={actions} sceneActions={sceneActions} objects={objects} text={text} user={user} scene={scene} />
        <Terminal errors={errors} />
      </div>
      <div id="scene" className="col-12 col-md-8">
        <View objects={objects} assets={assets} />
      </div>
    </div>
  );
};

// This makes sure we are getting what we think we should
Ide.propTypes = {
  text: PropTypes.string.isRequired,
  user: PropTypes.object,
  errors: PropTypes.string.isRequired,
  objects: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  assets: PropTypes.array.isRequired,
  scene: PropTypes.object.isRequired,
};

