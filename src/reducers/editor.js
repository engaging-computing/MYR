import {
  EDITOR_RENDER,
  EDITOR_REFRESH,
  EDITOR_RECOVER
} from '../actions/editorActions';

import Myr from '../myr/Myr';

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

const programs = [
  `
// Input your code here
animate(box({material: {color: 'red'}}));
var colors = ['red', 'blue', 'purple']

for( var i = 0 ; i < 20; i += 2){
    setPosition(0,i,0)
    animate(box({material: {color: colors[i % colors.length]}}));
    setPosition(i,i,i)
    animate(box({material: {color: colors[i % colors.length]}}));
    setPosition(i,i,-i)
    animate(box({material: {color: colors[i % colors.length]}}));
    setPosition(-i,i,i)
    animate(box({material: {color: colors[i % colors.length]}}));
    setPosition(-i,i,-i)
    animate(box({material: {color: colors[i % colors.length]}}));

}
`,
  `
// Input your code here
function dropb(x, y) {
    let b = box({material:"color: blue", position: x + " " + y + " " + -10});
    drop(b);
}

for( var i = -25 ; i < 25; i++){
    dropb(-i, i);
    dropb(-i, i + 25);
    dropb(-i, i + 50);
    dropb(-i, i + 75);
    dropb(-i, i + 100);
    dropb(-i, i + 125);
    dropb(-i, i + 150);
    dropb(-i, i + 175);
    dropb(-i, i + 200);
}
`,
  `
// Input your code here
function dropb(x, y) {
  let b = box({position: x + " " + y + " " + -10});
  drop(b);
  push(b, 0, 2, 0.1);
}

var n = [-5, -3, -1, 1, 3, 5];
for (var x of n) {
    dropb(x, 0);
}
`,
  `
// Input your code here

function dropb(x, y) {
  let b = box({position: x + " " + y + " " + -10});
  drop(b);
}

var n = [-5, -3, -1, 1, 3, 5];
for (var x of n) {
    dropb(x, 10);
    dropb(x, 7);
    dropb(x, 4);
}
`
];

const initial_state = {
  text: programs[Math.floor(Math.random() * programs.length)],
  objects: entityModel,
  assets: [],
  message: {
    text: "Everything Looks Good",
    time: Date.now()
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
  return Function(`${text}`)();
}

export default function editor(state = initial_state, action) {
  switch (action.type) {
    case EDITOR_RENDER:
      // build an object to save the snap
      let snap = {
        timestamp: Date.now(),
        text: action.text,
        error: false
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
        if (m) {
          els = m.els;
          assets = m.assets;
        }
      }
      catch (err) {
        console.error("Eval failed: " + err);
        snapshots.push({ ...snap, error: true });
        return {
          ...state,
          text: action.text,
          objects: els,
          assets: assets,
          message: {
            text: "Eval failed: " + err,
            time: Date.now()
          }
        };
      }
      snapshots.push(snap);
      return {
        ...state,
        text: action.text,
        objects: els,
        assets: assets,
        message: {
          text: "Everything Looks Good",
          time: Date.now()
        }
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
      // Call this function again with new params
      return editor({ ...state }, { type: EDITOR_RENDER, text: snapshots[stableIndex].text });
    default:
      return state;
  }
}