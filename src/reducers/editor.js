import Myr from '../myr/Myr';

var entityModel = [
  {
    geometry: {
      primitive: "box",
      depth: 50,
      height: 1,
      width: 50
    },
    material: "color: #2E3837",
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
  scene: {
    name: "untitled",
    id: "0"
  },
  errors: "Everything Looks Good"
};

export default function editor(state = initial_state, action) {
  switch (action.type) {
    case 'EDITOR_RENDER':
      try {
        var res, str;
        let m = new Myr();
        let funs = Object.getOwnPropertyNames(m).filter((p) => {
          return typeof m[p] === 'function';
        });
        let snapshot = action.text;
        for (var fun of funs) {
          snapshot = snapshot.replace(new RegExp(fun + "\\(", 'g'), "myr." + fun + "(");
        }
        str = "window.myr = m;\n";
        // eslint-disable-next-line        
        res = eval(str + snapshot + "\nmyr.res;");
        var els = res.els;
        var assets = res.assets;
      }
      catch (err) {
        console.error("Eval failed: " + err);
        return {
          ...state,
          text: action.text,
          objects: initial_state.objects.concat(els),
          assets: assets,
          errors: "Eval failed: " + err
        };
      }
      return {
        ...state,
        text: action.text,
        objects: initial_state.objects.concat(els),
        assets: assets,
        errors: "Everything Looks Good"
      };
    case 'EDITOR_REFRESH':
      window.myr = new Myr();
      return {
        ...initial_state,
        text: action.text
      };
    case 'NAME_SCENE':
      return {
        ...state,
        scene: {
          id: state.scene.id,
          name: action.name
        }
      };
    case 'NEW_SCENE':
      let projectID = "";
      if (state.user.uid) {
        let ts = Date.now();
        projectID = state.user.uid + '_' + ts;
      }
      return {
        ...state,
        scene: {
          id: projectID,
          name: state.scene.name
        }
      };
    case 'LOAD_SCENE':
      let newScene = {
        ...state.scene,
        id: action.id
      };
      return {
        ...state,
        scene: newScene
      };

    default:
      return state;
  }
}