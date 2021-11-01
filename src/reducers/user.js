import * as types from "../constants/ActionTypes";

const initial_state = {
    user: null,
    settings: {
        darkMode: false
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
            return {
                user: null
            };
        case types.REFRESH_TOKEN:
            return {
                user: {
                    ...state,
                    uid: action.token
                }
            };
        case types.TOGGLE_DARK_MODE:
            return {
                ...state,
                settings:{
                    ...state.settings,
                    darkMode: !state.settings.darkMode
                }
            };
        default:
            return state;
    }
}
