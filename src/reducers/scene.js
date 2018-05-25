const initial_state = {
  name: "",
  id: "0",
  sceneConfig: {
    skyColor: "blue",
    camConfig: 1
  }
};

export default function scene(state = initial_state, action) {
  switch (action.type) {
    case 'NAME_SCENE':
      return {
        ...state,
        name: action.name
      };
    case 'LOAD_SCENE':
      return {
        ...state,
        id: action.id
      };
    default:
      return state;
  }
}