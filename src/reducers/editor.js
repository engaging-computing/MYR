import {EDITOR_RENDER, EDITOR_REFRESH} from '../actions/editorActions';
import Myr from '../myr/Myr';

var entityModel = [
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
    position: "0 -1 -10"
  },
];

const programs = [
  `// Input your code here
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
  
  }`,
  `// Input your code here
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
  }`,
  `// Input your code here

function dropb(x, y) {
    let b = box({position: x + " " + y + " " + -10});
    drop(b);
    push(b, 0, 2, 0.1);
}

var n = [-5, -3, -1, 1, 3, 5];
for (var x of n) {
    dropb(x, 0);
}`,
  `// Input your code here

function dropb(x, y) {
    let b = box({position: x + " " + y + " " + -10});
    drop(b);
}

var n = [-5, -3, -1, 1, 3, 5];
for (var x of n) {
    dropb(x, 10);
    dropb(x, 7);
    dropb(x, 4);
}`
];

const initial_state = {
  text: programs[Math.floor(Math.random() * programs.length)],
  objects: entityModel,
  assets: [],
  errors: "Everything Looks Good"
};

let m = new Myr();
window.m = m
m.init(entityModel);

// ESLint doesn't like this but it is better than eval
function noEvalEvaluation(text){
  try {
    // eslint-disable-next-line
    return Function(`${text}`)();
  } catch (error) {
    return error;
  }
}

export default function editor(state = initial_state, action) {
  switch (action.type) {
    case EDITOR_RENDER:
      m.reset();
      let els = [];
      let assets = [];
      // DO SOMETHING HERE WITH PREV STATE
      try {
        noEvalEvaluation(action.text);
        if (m) {
          els = m.els || [];
          assets = m.assets || [];
        }
      }
      catch (err) {
        console.error("Eval failed: " + err);
        return {
          ...state,
          text: action.text,
          objects: els,
          assets: assets,
          errors: "Eval failed: " + err
        };
      }
      return {
        ...state,
        text: action.text,
        objects: els,
        assets: assets,
        errors: "Everything Looks Good"
      };
    case EDITOR_REFRESH:
      m.reset();
      return {
        ...initial_state,
        text: action.text
      };
    default:
      return state;
  }
}