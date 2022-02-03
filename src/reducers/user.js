import * as types from "../constants/ActionTypes";

const initial_state = {
    user: null,
};

/**
 * User Reducers
 */
export default function user(state = initial_state, action) {
    switch (action.type) {
        //Save user data to state
        case types.LOGIN:
            return {
                user: action.user
            };
        //Remove user data from state
        case types.LOGOUT:
            return {
                user: null
            };
        //Assign new token to the uid
        case types.REFRESH_TOKEN:
            return {
                user: {
                    ...state,
                    uid: action.token
                }
            };
        default:
            return state;
    }
}
