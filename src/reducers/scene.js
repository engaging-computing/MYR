import * as types from "../constants/ActionTypes";

export const DEF_SETTINGS = {
    skyColor: "white",
    floorColor: "#222",
    camConfig: 0,
    showCoordHelper: true,
    showFloor: false,
    cameraPosition: "0 1.6 3",
    viewOnly: false,
    defaultLight: true,
    castShadow: false,
    lightIndicator: false,
    moveSpeed: 150,
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


/**
 * Scene Reducers
 */
export default function scene(state = initial_state, action) {
    if (state.settings.name) {
        delete state.settings.name;
    }
    if (state.settings.id) {
        delete state.settings.id;
    }
    switch (action.type) {
        //Update the name of the scene
        case types.NAME_SCENE:
            return {
                ...state,
                name: action.name
            };
        //Load a new scene
        case types.LOAD_SCENE:
            return {
                ...action.data
            };
        //Toggle the grid
        case types.TOGGLE_COORD_SKY:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    showCoordHelper: !state.settings.showCoordHelper
                }
            };
        //Update the position of the camera
        case types.SET_CAMERA:
            let camPos = `${action.x || 0} ${action.y + (Math.random() / 10) || 1.6} ${action.z || 0}`;
            return {
                ...state,
                settings: {
                    ...state.settings,
                    cameraPosition: camPos
                }
            };
        //Toggle the viewOnly mode 
        case types.CHANGE_VIEW:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    viewOnly: !state.settings.viewOnly
                }
            };
        //Update the color of sky
        case types.CHANGE_SKY_COLOR:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    skyColor: action.color
                }
            };
        //Update the color of floor
        case types.CHANGE_FLOOR_COLOR:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    floorColor: action.color
                }
            };
        //Toggle the floor
        case types.TOGGLE_FLOOR:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    showFloor: !state.settings.showFloor
                }
            };
        //Toggle the default light
        case types.TOGGLE_DEFAULT_LIGHT:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    defaultLight: !state.settings.defaultLight
                }
            };
        //Toggle the cast of shadow
        case types.TOGGLE_CAST_SHADOW:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    castShadow: !state.settings.castShadow
                }
            };
        //Toggle the light indicator
        case types.TOGGLE_LIGHT_INDICATOR:
            return{
                ...state,
                settings:{ 
                    ...state.settings,
                    lightIndicator: !state.settings.lightIndicator
                }
            };
        //Add the scene to the collection
        case types.ADD_COLLECTION:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    collectionID: action.payload
                }
            };
        //Remove the scene from the collection
        case types.REMOVE_COLLECTION:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    collectionID: null
                }
            };
        //Set the description of the scene
        case types.SET_DESC:
            return {
                ...state,
                desc: action.payload
            };
        //Set the name and the description of the scene
        case types.SET_NAME_DESC:
            return {
                ...state,
                name: action.payload.name,
                desc: action.payload.desc
            };
        //Load the scene settings
        case types.LOAD_SETTINGS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    ...action.payload
                }
            };
        //Update the specific scene settings
        case types.CHANGE_SETTINGS:
            const { param, val } = action.payload;
            return {
                ...state,
                settings: {
                    ...state.settings,
                    [param]: val
                }
            };
        //Reset the settings to the default
        case types.RESET_SETTINGS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    castShadow: !state.settings.castShadow
                }
            };
        case types.UPDATE_MOVE_SPEED:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    moveSpeed: action.speed
                }
            };
        default:
            return state;
    }
}
