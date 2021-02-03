import * as types from "../constants/ActionTypes";

/**
 * This function registers the scene"s name with Redux
 *
 * @param {string} name the name is given by the user or when a scene is loaded
 *
 * @returns a reducer action with type:NAME_SCENE
 */
export function nameScene(name) {
    return { type: types.NAME_SCENE, name };
}

/**
 * This function registers the scene's id with Redux
 *
 * @param {string} id the id of the loaded scene
 *
 * @returns a reducer action with type:LOAD_SCENE
 */
export function loadScene(data) {
    return { type: types.LOAD_SCENE, data };
}

export function toggleCoordSky() {
    return { type: types.TOGGLE_COORD_SKY };
}

export function changeSkyColor(color) {
    return { type: types.CHANGE_SKY_COLOR, color };
}

export function changeFloorColor(color) {
    return { type: types.CHANGE_FLOOR_COLOR, color };
}

export function changeCamMode(config) {
    return { type: types.CHANGE_CAM_MODE, config };
}

export function setCamera(x, y, z) {
    return { type: types.SET_CAMERA, x, y, z };
}

export function changePerspective() {
    return { type: types.CHANGE_PERSPECTIVE };
}

export function changeView() {
    return { type: types.CHANGE_VIEW };
}

export function toggleFly() {
    return { type: types.TOGGLE_FLY };
}

export function toggleFloor() {
    return { type: types.TOGGLE_FLOOR };
}

export function loadSettings(payload) {
    return { type: types.LOAD_SETTINGS, payload };
}

export function changeSetting(payload) {
    return { type: types.LOAD_SETTINGS, payload };
}

export function addCollectionID(payload) {
    return { type: types.ADD_CLASSROOM, payload };
}

export function removeCollectionID(payload) {
    return { type: types.REMOVE_CLASSROOM, payload};
}

export function setDesc(payload) {
    return { type: types.SET_DESC, payload };
}

export function setNameDesc(payload) {
    return { type: types.SET_NAME_DESC, payload };
}

export default {
    nameScene,
    loadScene,
    toggleCoordSky,
    changeSkyColor,
    changeFloorColor,
    changeCamMode,
    setCamera,
    changePerspective,
    changeView,
    toggleFly,
    toggleFloor,
    loadSettings,
    changeSetting,
    addCollectionID,
    setDesc,
    setNameDesc,
    removeCollectionID
};