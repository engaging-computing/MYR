import {
  LOAD_SCENE,
  NAME_SCENE,
  TOGGLE_COORD_SKY,
  //  CHANGE_SKY_COLOR,
  //  CHANGE_CAM_MODE,
  SET_CAMERA,
  // CHANGE_PERSPECTIVE,
  CHANGE_VIEW
} from '../actions/sceneActions';

const initial_state = {
  name: "",
  id: "0",
  skyColor: "white",
  camConfig: 0,
  showCoordHelper: true,
  cameraPosition: "0 1.6 0",
  viewOnly: false
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
    case SET_CAMERA:
      let camPos = `${action.z || 0} ${action.y || 1.6} ${action.z || 0}`;
      return {
        ...state,
        cameraPosition: camPos
        };
      case CHANGE_VIEW:
        return {
          ...state,
          viewOnly: !state.viewOnly
        };
    default:
      return state;
  }
}