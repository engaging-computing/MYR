import Myr from '../myr/Myr'

var entityModel = [
  {
    geometry: {
      primitive: "box"
    },
    material: {
      color: "red"
    },
    position: {
      x: 5,
      y: 3,
      z: -5
    }
  },
  {
    geometry: {
      primitive: "box"
    },
    material: {
      color: "red"
    },
    position: {
      x: 0,
      y: 3,
      z: -5
    }
  },
  {
    geometry: {
      primitive: "box"
    },
    material: {
      color: "red"
    },
    position: {
      x: -5,
      y: 3,
      z: -5
    }
  }
]

const initial_state = {
  text: "// Input your code here\nanimate(box({material: {color: 'red'}}));",
  objects: entityModel,
  assets: [],
  user: null,
  sceneName: "untitled"
}

export default function scene(state = initial_state, action) {
  switch (action.type) {
    case 'EDITOR_RENDER':
      try {
        var res, str;
        let m = new Myr();
        let funs = Object.getOwnPropertyNames(m).filter((p) => {
          return typeof m[p] === 'function';
        })
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
        console.error("Eval failed: " + err)
      }
      return {
        ...state,
        text: action.text,
        objects: initial_state.objects.concat(els),
        assets: assets,
      }
    case 'EDITOR_REFRESH':
      window.myr = new Myr()
      return {
        ...state,
        initial_state
      }
    case 'LOGIN':
      return {
        ...state,
        user: action.user
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    case 'NAME_SCENE':
      return {
        ...state,
        sceneName: action.name
      }
    default:
      return state
  }
}