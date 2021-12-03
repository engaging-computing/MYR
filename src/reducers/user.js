import * as types from "../constants/ActionTypes";

const initial_state = {
    user: null,
    settings: {
        darkMode: false,
        fontSize: 12
    }
};

export default function user(state = initial_state, action) {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                user: action.user
            };
        case types.LOGOUT:
            return initial_state;
        case types.REFRESH_TOKEN:
            return {
                ...state,
                user: {
                    ...state.user,
                    uid: action.token
                }
                
            };
        case types.SYNC_USER_SETTINGS:
            return {
                ...state,
                settings: action.settings
            };
        case types.TOGGLE_DARK_MODE:
            return {
                ...state,
                settings:{
                    ...state.settings,
                    darkMode: !state.settings.darkMode
                }
            };
        case types.UPDATE_FONT_SIZE:
            return{
                ...state,
                settings: {
                    ...state.settings,
                    fontSize: action.newFont
                }
            };
        default:
            return state;
    }
}
