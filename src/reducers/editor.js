import { EDITOR_RENDER, EDITOR_REFRESH } from '../actions'

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
  text: "// Input your code here",
  objects: entityModel
}

export default function scene(state = initial_state, action) {
  switch (action.type) {
    case 'EDITOR_RENDER':
      try{
        eval(action.text)
      }
      catch(err){
        console.error("Eval failed")
      }
      return {
          text: action.text,
          objects: entityModel
      }
    case 'EDITOR_REFRESH':
      return initial_state
    default:
      return state
  }
}