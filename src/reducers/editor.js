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
  text: "// Input your code here\nmyr.box();",
  objects: entityModel
}

export default function scene(state = initial_state, action) {
  switch (action.type) {
    case 'EDITOR_RENDER':
      try{
        // eslint-disable-next-line
        var x;
        x = eval("var myr = new Myr();\n" + action.text + "\nmyr.els;");
      }
      catch(err){
        console.error("Eval failed")
      }
      return {
          text: action.text,
          objects: entityModel.concat(x)
      }
    case 'EDITOR_REFRESH':
      return initial_state
    default:
      return state
  }
}