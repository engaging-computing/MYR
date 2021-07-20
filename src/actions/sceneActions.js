import * as types from "../constants/ActionTypes";

/**
 * This function registers the scene's name with Redux
 *
 * @param {string} name the name is given by the user or when a scene is loaded
 *
 * @returns a reducer action with type:NAME_SCENE
 */
export function nameScene(name) {
    return { type: types.NAME_SCENE, name };
}

/**
 * This function load data of scene to the redux store
 *
 * @param {string} data the id of the loaded scene
 *
 * @returns a reducer action with type:LOAD_SCENE
 */
export function loadScene(data) {
    return { type: types.LOAD_SCENE, data };
}

/**
 * Sends a signal to the reducer to toggle the coordinate floor
 * 
 * @returns {object} reducer action obj with type: TOGGLE_COORD_SKY
 */
export function toggleCoordSky() {
    return { type: types.TOGGLE_COORD_SKY };
}

/**
 * Sends a signal to the reducer to toggle the default light
 * 
 * @returns {object} reducer action obj with type: TOGGLE_DEFAULT_LIGHT
 */
export function toggleDefaultLight() {
    return { type: types.TOGGLE_DEFAULT_LIGHT };
}

/**
 * Sends a signal to the reducer to toggle the floor
 * 
 * @returns {object} reducer action obj with type: TOGGLE_FLOOR
 */
export function toggleFloor() {
    return { type: types.TOGGLE_FLOOR };
}

/**
 * Sends a signal to the reducer to toggle for light to cast shadow
 * 
 * @returns {object} reducer action obj with type: TOGGLE_CAST_SHADOW
 */
export function toggleCastShadow() {
    return { type: types.TOGGLE_CAST_SHADOW };
}

/**
 * Sends a signal to the reducer to toggle for light to show light indicator
 * 
 * @returns {object} reducer action obj with type: TOGGLE_LIGHT_INDICATOR
 */
export function toggleLightIndicator(){
    return {type: types.TOGGLE_LIGHT_INDICATOR};
}

/**
 * Sends a signal to the reducer to change the sky color
 * 
 * @param {string} color Color to be change to
 * 
 * @returns {object} reducer action obj with type: CHANGE_SKY_COLOR with color;
 */
export function changeSkyColor(color) {
    return { type: types.CHANGE_SKY_COLOR, color };
}

/**
 * Sends a signal to the reducer to change the sky color
 * 
 * @param {string} color Color to be change to
 * 
 * @returns {object} reducer action obj with type: CHANGE_FLOOR_COLOR with color;
 */
export function changeFloorColor(color) {
    return { type: types.CHANGE_FLOOR_COLOR, color };
}

/**
 * Sends a signal to the reducer to change the position of the camera
 * 
 * @param {number} x X Position
 * @param {number} y Y Position
 * @param {number} z Z Position
 * 
 * @returns {object} reducer action obj with type: SET_CAMERA with x,y,z position
 */
export function setCamera(x, y, z) {
    return { type: types.SET_CAMERA, x, y, z };
}

/**
 * Sends a signal to the reducer to toggle to be view only(hide the editor) or not
 * 
 * @returns {object} reducer action obj with type: CHANGE_VIEW
 */
export function changeView() {
    return { type: types.CHANGE_VIEW };
}

/**
 * Sends a signal to the reducer to load the settings sends by the 
 * 
 * @returns {object} reducer action obj with type: 
 */
export function loadSettings(payload) {
    return { type: types.LOAD_SETTINGS, payload };
}

/**
 * Sends a signal to the reducer to reset the settings to default
 * 
 * @returns {object} reducer action obj with type: RESET_SETTINGS
 */
export function resetSettings() {
    return { type: types.RESET_SETTINGS };
}

/**
 * Sends a signal to the reducer to add the scene to the collection
 * 
 * @param {string} payload id of collection to add scene to
 * 
 * @returns {object} reducer action obj with type: ADD_COLLECTION with payload
 */
export function addCollectionID(payload) {
    return { type: types.ADD_COLLECTION, payload };
}

/**
 * Sends a signal to the reducer to add the scene to the collection
 * 
 * @param {string} payload id of collection to remove scene to
 * 
 * @returns {object} reducer action obj with type: REMOVE_COLLECTION with payload
 */
export function removeCollectionID(payload) {
    return { type: types.REMOVE_COLLECTION, payload};
}

/**
 * Sends a signal to the reducer to cahnge the description of the scene
 * 
 * @param {string} payload description of the 
 * 
 * @returns {object} reducer action obj with type: SET_DESC with payload
 */
export function setDesc(payload) {
    return { type: types.SET_DESC, payload };
}

/**
 * Sends a signal to the reducer to change both name and description
 * 
 * @returns {object} reducer action obj with type: 
 */
export function setNameDesc(payload) {
    return { type: types.SET_NAME_DESC, payload };
}

/**
 * Sends a signal to the reducer to change the speed of movement
 * 
 * @param {number} speed 
 * @returns 
 */
export function updateMoveSpeed(speed) {
    return { type: types.UPDATE_MOVE_SPEED, speed };
}

/*
 *  Unused functions
 */
/**
 * Sends a signal to the reducer to change the settings
 * 
 * @returns {object} reducer action obj with type: CHANGE_SETTINGS with payload
 */
export function changeSettings(payload) {
    return { type: types.CHANGE_SETTINGS, payload };
}

/**
 * Sends a signal to the reducer to change the mode of the camera
 * 
 * @param {*} config New mode to change
 * 
 * @returns {object} reducer action obj with type: CHANGE_CAM_MODE with config
 */
export function changeCamMode(config) {
    return { type: types.CHANGE_CAM_MODE, config };
}

/**
 * Sends a signal to the reducer to change the perspective
 * 
 * @returns {object} reducer action obj with type: CHANGE_PERSPECTIVE
 */
export function changePerspective() {
    return { type: types.CHANGE_PERSPECTIVE };
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
    toggleFloor,
    loadSettings,
    changeSettings,
    resetSettings,
    addCollectionID,
    setDesc,
    setNameDesc,
    removeCollectionID,
    toggleDefaultLight,
    toggleCastShadow,
    toggleLightIndicator,
    updateMoveSpeed
};
