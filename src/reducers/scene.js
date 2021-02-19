import * as types from "../constants/ActionTypes";

export const DEF_SETTINGS = {
    skyColor: "white",
    floorColor: "#222",
    camConfig: 0,
    showCoordHelper: false,
    canFly: false,
    showFloor: true,
    cameraPosition: "0 1.6 3",
    viewOnly: false,
    defaultLight: true,
    castShadow: false,
    lightIndicator: false,
    collectionID: ""
};

const initial_state = {
    name: "",
    id: 0,
    desc: "",
    ts: 0,
    uid: -1,
    settings: DEF_SETTINGS
};



export default function scene(state = initial_state, action) {
    if (state.settings.name) {
        delete state.settings.name;
    }
    if (state.settings.id) {
        delete state.settings.id;
    }
    switch (action.type) {
        case types.NAME_SCENE:
            return {
                ...state,
                name: action.name
            };
        case types.LOAD_SCENE:
            return {
                ...action.data
            };
        case types.TOGGLE_COORD_SKY:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    showCoordHelper: !state.settings.showCoordHelper
                }
            };
        case types.TOGGLE_FLY:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    canFly: !state.settings.canFly
                }
            };
        case types.SET_CAMERA:
            let camPos = `${action.x || 0} ${action.y + (Math.random() / 10) || 1.6} ${action.z || 0}`;
            return {
                ...state,
                settings: {
                    ...state.settings,
                    cameraPosition: camPos
                }
            };
        case types.CHANGE_VIEW:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    viewOnly: !state.settings.viewOnly
                }
            };
        case types.CHANGE_SKY_COLOR:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    skyColor: action.color
                }
            };
        case types.CHANGE_FLOOR_COLOR:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    floorColor: action.color
                }
            };
        case types.TOGGLE_FLOOR:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    showFloor: !state.settings.showFloor
                }
            };
        case types.ADD_CLASSROOM:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    collectionID: action.payload
                }
            };
        case types.REMOVE_CLASSROOM:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    collectionID: null
                }
            };
        case types.LOAD_SETTINGS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    ...action.payload
                }
            };
        case types.SET_DESC:
            return {
                ...state,
                desc: action.payload
            };
        case types.SET_NAME_DESC:
            return {
                ...state,
                name: action.payload.name,
                desc: action.payload.desc
            };
        case types.CHANGE_SETTINGS:
            const { param, val } = action.payload;
            return {
                ...state,
                settings: {
                    ...state.settings,
                    [param]: val
                }
            };
        case types.RESET_SETTINGS:
            return {
                ...state,
                settings: DEF_SETTINGS
            };
        case types.TOGGLE_DEFAULT_LIGHT:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    defaultLight: !state.settings.defaultLight
                }
            };
        case types.TOGGLE_CAST_SHADOW:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    castShadow: !state.settings.castShadow
                }
            };
        case types.TOGGLE_LIGHT_INDICATOR:
            return{
                ...state,
                settings:{ 
                    ...state.settings,
                    lightIndicator: !state.settings.lightIndicator
                }
            };
        default:
            return state;
    }
}