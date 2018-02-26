import { EDITOR_RENDER, EDITOR_REFRESH } from '../actions'

const initial_state = []

export default function scene(state = {text: "// Input your code here" }, action) {
  switch (action.type) {
    case 'EDITOR_RENDER':
      state.text = action.text
      console.log(state)
      return state;
    case 'EDITOR_REFRESH':
      return [
        ...state,
        {
          text: "",
          id: "1"
        }
      ]
    default:
      return state
  }
}