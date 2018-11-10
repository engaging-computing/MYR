import {
  LOAD_SCENE,
  NAME_SCENE,
  TOGGLE_COORD_SKY,
  SET_CAMERA,
  CHANGE_VIEW,
  TOGGLE_FLY,
  CHANGE_SKY_COLOR,
  TOGGLE_FLOOR,
} from '../actions/sceneActions';

const initial_state = {
  name: "",
  id: "0",
  skyColor: "white",
  camConfig: 0,
  showCoordHelper: false,
  canFly: false,
  showFloor: true,
  cameraPosition: "0 1.6 3",
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
    case TOGGLE_FLY:
      return {
        ...state,
        canFly: !state.canFly
      };
    case SET_CAMERA:
      let camPos = `${action.x || 0} ${action.y + (Math.random() / 10) || 1.6} ${action.z || 0}`;
      return {
        ...state,
        cameraPosition: camPos
      };
    case CHANGE_VIEW:
      return {
        ...state,
        viewOnly: !state.viewOnly
      };
    case CHANGE_SKY_COLOR:
      return {
        ...state,
        skyColor: action.color
      };
    case TOGGLE_FLOOR:
      return {
        ...state,
        showFloor: !state.showFloor
      };
    default:
      return state;
  }
}
