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
    geometry: `
      primitive: box;
      depth: 80;
      height: 0.25;
      width: 80;
    `,
    material: "color: #222",
    "static-body": "shape: box",
    position: { x: 0, y: -0.5, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0 }
  },
];

const welcomeText =
  `/**********************************************************
*                   Welcome to MYR!                       *
*  Getting Started? - https://www.learnmyr.org/first-time *
**********************************************************/
`;

const initial_state = {
  text: welcomeText,
  objects: entityModel,
  assets: [],
  message: {
    text: "",
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


let m = new Myr(entityModel);
m.init();

// Use this to attach it to the window for debugging
window.m = m;

// ESLint doesn't like this but it is better than eval
function noEvalEvaluation(text) {
  // eslint-disable-next-line
  return Function(`'use strict'; ${text}`)();
}

export default function editor(state = initial_state, action) {

  switch (action.type) {
    case EDITOR_RENDER:
      m.reset()
      // build an object to save the snap
      let snap = {
        user: action.uid ? action.uid : 'unknown',
        timestamp: Date.now(),
        text: action.text,
        error: false
      };

      let message = {
        text: "",
        time: Date.now()
      };

      /* For now we want to re-render everything.
      * Initializing with [] avoid issues with mapping in View.
      * In the future we might want to calculate diff and store it
      */
      // m.reset();
      let els = [];
      let assets = [];

      try {
        noEvalEvaluation(action.text);
      }
      catch (err) {
        // Notify that eval failed
        console.error("Eval failed: " + err);
        message = { ...message, text: "Eval failed: " + err };
        snap = { ...snap, error: true };
      }
      // Otherwise we successfully rendered
      if (m) {
        els = m.els;
        assets = m.assets;
      }
      snaps.doc(snap.user + '_' + snap.timestamp).set(snap);
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
      while (snapshots[stableIndex].error === true) {
        stableIndex--;
      }

      // Call editor function again with new params
      return editor({ ...state }, { type: EDITOR_RENDER, text: snapshots[stableIndex].text });
    default:
      return state;
  }
}
