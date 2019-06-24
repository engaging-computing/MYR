import * as types from "../constants/ActionTypes";

const initial_state = {
    userProjs: [],
    exampleProjs: []
};

export default function project(state = initial_state, action) {
    switch (action.type) {
        case types.SYNC_USER_PROJ:
            return {
                ...state,
                userProjs: action.payload
            };
        case types.SYNC_EXAMP_PROJ:
            return {
                ...state,
                exampleProjs: action.payload
            };
        case types.DELETE_PROJ:
            let projs = [];
            projs = state.userProjs.filter(x => {
                return x.id !== action.id;
            });
            return {
                ...state,
                userProjs: projs
            };
        default:
            return state;
    }
}
