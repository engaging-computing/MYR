import * as types from "../constants/ActionTypes";

const initial_state = {
    user: null,
};

export default function user(state = initial_state, action) {
    switch (action.type) {
        case types.LOGIN:
            return {
                user: action.user
            };
        case types.LOGOUT:
            return {
                user: null
            };
        default:
            return state;
    }
}
