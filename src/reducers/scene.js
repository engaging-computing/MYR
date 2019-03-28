import * as types from '../constants/ActionTypes';

export const DEF_SETTINGS = {
  name: "",
  id: "0",
  skyColor: "white",
  floorColor: "#222",
  camConfig: 0,
  showCoordHelper: false,
  canFly: false,
  showFloor: true,
  cameraPosition: "0 1.6 3",
  viewOnly: false,
  classroomID: ""
};

export default function scene(state = DEF_SETTINGS, action) {
  switch (action.type) {
    case types.NAME_SCENE:
      return {
        ...state,
        name: action.name
      };
    case types.LOAD_SCENE:
      return {
        ...state,
        id: action.id
      };
    case types.TOGGLE_COORD_SKY:
      return {
        ...state,
        showCoordHelper: !state.showCoordHelper
      };
    case types.TOGGLE_FLY:
      return {
        ...state,
        canFly: !state.canFly
      };
    case types.SET_CAMERA:
      let camPos = `${action.x || 0} ${action.y + (Math.random() / 10) || 1.6} ${action.z || 0}`;
      return {
        ...state,
        cameraPosition: camPos
      };
    case types.CHANGE_VIEW:
      return {
        ...state,
        viewOnly: !state.viewOnly
      };
    case types.CHANGE_SKY_COLOR:
      return {
        ...state,
        skyColor: action.color
      };
    case types.CHANGE_FLOOR_COLOR:
      return {
        ...state,
        floorColor: action.color
      };
    case types.TOGGLE_FLOOR:
      return {
        ...state,
        showFloor: !state.showFloor
      };
    case types.ADD_CLASSROOM:
      return {
        ...state,
        classroomID: action.payload
      };
    case types.LOAD_SETTINGS:
      return {
        ...action.payload
      };
    case types.CHANGE_SETTING:
      const { param, val } = action.payload;
      return {
        ...state,
        [param]: val
      };
    default:
      return state;
  }
}