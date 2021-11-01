import * as types from "../constants/ActionTypes";

export function toggleDarkMode(){
    return { type: types.TOGGLE_DARK_MODE };
}

export default {
    toggleDarkMode,
};