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
  text: "// Input your code here\nanimate(box());",
  objects: entityModel
}

export default function scene(state = initial_state, action) {
  switch (action.type) {
    case 'EDITOR_RENDER':
      try{
        // eslint-disable-next-line
        var x, str;
        let m = new Myr;
        let funs = Object.getOwnPropertyNames(m).filter((p) => {
          return typeof m[p] === 'function';
        })
        let snapshot = action.text;
        for (var fun of funs) {
          snapshot = snapshot.replace(new RegExp(fun+"\\(", 'g'), "myr."+fun+"(");
        }
        str = window.myr ? "" : "window.myr = new Myr();\n"
        x = eval(str + snapshot + "\nmyr.els;");
      }
      catch(err){
        console.error("Eval failed: " + err)
      }
      return {
          text: action.text,
          objects: entityModel.concat(x)
      }
    case 'EDITOR_REFRESH':
      window.myr.els = []
      return initial_state
    default:
      return state
  }
}