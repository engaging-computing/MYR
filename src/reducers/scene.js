import {
  LOAD_SCENE,
  NAME_SCENE,
  TOGGLE_COORD_SKY,
  CHANGE_SKY_COLOR,
  CHANGE_CAM_MODE,
  RESET_CAMERA,
  CHANGE_PERSPECTIVE
} from '../actions/sceneActions';

const initial_state = {
  name: "",
  id: "0",
  skyColor: "white",
  camConfig: 0,
  showCoordHelper: false,
  cameraPosition: "0 2.6 0"
};

export default function scene(state = initial_state, action) {
  switch (action.type) {
    case NAME_SCENE:
      return {
        ...state,
        name: action.name
      };
    case LOAD_SCENE:
      return {
        ...state,
        id: action.id
      };
    case TOGGLE_COORD_SKY:
      return {
        ...state,
        showCoordHelper: !state.showCoordHelper
      };
    case RESET_CAMERA:
      return {
        ...state,
        cameraPosition: "0 5.6 0"
        };
    default:
      return state;
  }
}