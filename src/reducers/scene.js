const initial_state = {
  scene: {
    name: "",
    id: "0"
  }
};

export default function scene(state = initial_state, action) {
  switch (action.type) {
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