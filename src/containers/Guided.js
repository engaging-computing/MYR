import React from 'react';
import Editor from '../components/Editor';
import View from '../components/View';
import Level from '../components/Level';
import PropTypes from 'prop-types';

const sampleLevel = {
  id: 1,
  name: "Intro to MYR",
  stages: [
    {
      isQuiz: false,
      prompt: "Here we learn about functions",
      levelText: "Functions do things and stuff",
      sceneText: `sphere()`,

    },
    {
      isQuiz: true,
      prompt: "What is MYR?",
      sceneText: `sphere()\nsphere()`,
      opts: [
        {
          text: "A Lemon",
          value: false,
        },
        {
          text: "A VR Platform",
          value: true,
        },
      ]
    },
    {
      isQuiz: true,
      prompt: "Do you like it?",
      sceneText: `sphere()\nsphere()`,
      opts: [
        {
          text: "Yes",
          value: true,
        },
        {
          text: "No",
          value: true,
        },
      ]
    }
  ]
}


/**
* @summary - Guided is used for scripted lesson plans. This path is tightly controlled
* and designed to reduce errors at the cost of some creative freedom. 
* 
* @param {string} text - text for the editor
* @param {array} objects - objects for the MYR render
* @param {array} assets - obj models
* @param {object} user - user info
* @param {object} scene - screne name and id
* @param {string} errors - errors from the render process
* @param {array} actions - render, recover, rrfresh
* 
* @returns - JSX expression
*/
export default function Guided({ text, objects, assets, user, scene, errors, actions }) {
  return (
    <div className="row no-gutters">
      <div id="interface" className="col-12 col-md-4">
        <Editor objects={objects} text={text} user={user} />
        <Level level={sampleLevel} actions={actions} />
      </div>
      <div id="scene" className="col-12 col-md-8">
        <View objects={objects} sceneConfig={scene.sceneConfig} assets={assets} />
      </div>
    </div>
  );
};

// This makes sure we are getting what we think we should
Guided.propTypes = {
  text: PropTypes.string.isRequired,
  user: PropTypes.object,
  errors: PropTypes.string.isRequired,
  objects: PropTypes.array.isRequired,
  assets: PropTypes.array.isRequired,
  scene: PropTypes.object.isRequired,
};