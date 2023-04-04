import * as types from "../constants/ActionTypes";

const initial_state = {
    user: null,
    settings: {
        fontSize: 12,
        theme: "github",
    }
};

/**
 * User Reducers
 */
export default function user(state = initial_state, action) {
    switch (action.type) {
        //Save user data to state
        case types.LOGIN:
            return {
                ...state,
                user: action.user
            };
        //Remove user data from state
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
        case types.UPDATE_FONT_SIZE:
            return{
                ...state,
                settings: {
                    ...state.settings,
                    fontSize: action.fontSize
                }
            };
        case types.UPDATE_THEME:
            return{
                ...state,
                settings: {
                    ...state.settings,
                    theme: action.theme
                }
            };
        default:
            return state;
    }
}
