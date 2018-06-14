import {
  EDITOR_RENDER,
  EDITOR_REFRESH,
  EDITOR_RECOVER
} from '../actions/editorActions';

import Myr from '../myr/Myr';

import { snaps } from '../firebase.js';

let entityModel = [
  {
    id: 'floor',
    geometry: {
      primitive: "box",
      depth: 50,
      height: 1,
      width: 50
    },
    material: "color: #222",
    "static-body": "shape: box",
    position: "0 -1 0"
  },
];

const initial_state = {
  text: "",
  objects: entityModel,
  assets: [],
  message: {
    text: "Scene is Ready",
    time: 0
  }
};

/**
* @summary - Snapshots is an array of objects that record each time the user tries to render
*/
let snapshots = [
  {
    timestamp: Date.now(),
    text: `// Starting text:\n ${initial_state.text}`,
    error: false
  }
];


let m = new Myr();
m.init(entityModel);

// Use this to attach it to the window for debugging
// window.m = m;

// ESLint doesn't like this but it is better than eval
function noEvalEvaluation(text) {
  // eslint-disable-next-line
  return Function(`'use strict'; ${text}`)();
}

export default function editor(state = initial_state, action) {
  switch (action.type) {
    case EDITOR_RENDER:
      // build an object to save the snap
      let snap = {
        user: action.uid ? action.uid : 'unknown',
        timestamp: Date.now(),
        text: action.text,
        error: false
      };

      let message = {
        text: "Everything Looks Good",
        time: Date.now()
      };

      /* For now we want to re-render everything.
      * Initializing with [] avoid issues with mapping in View.
      * In the future we might want to calculate diff and store it
      */
      m.reset();
      let els = [];
      let assets = [];

      try {
        noEvalEvaluation(action.text);
      }
      catch (err) {
        // Notify that eval failed
        console.error("Eval failed: " + err);
        message = {...message, text: "Eval failed: " + err };
        snap = { ...snap, error: true };
      }
      // Otherwise we successfully rendered
      if (m) {
        els = m.els;
        assets = m.assets;
      }
      snaps.doc( snap.user + '_' + snap.timestamp).set(snap);
      snapshots.push(snap);
      return {
        ...state,
        text: action.text,
        objects: els,
        assets: assets,
        message
      };
    case EDITOR_REFRESH:
      m.reset();
      return {
        ...initial_state,
        text: action.text
      };
    case EDITOR_RECOVER:
      // Start at last snap
      let stableIndex = snapshots.length - 1;

      // Work backwards until we find a non-error snap
      while(snapshots[stableIndex].error === true){
        stableIndex--;
      }

      // Call editor function again with new params
      return editor({ ...state }, { type: EDITOR_RENDER, text: snapshots[stableIndex].text });
    default:
      return state;
  }
}