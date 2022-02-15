import * as types from "../constants/ActionTypes";

const initial_state = {
    userProjs: [],
    exampleProjs: []
};

/**
 * Project Reducers
 */
export default function project(state = initial_state, action) {
    switch (action.type) {
        //Update the list of user projects
        case types.SYNC_USER_PROJ:
            return {
                ...state,
                userProjs: action.payload
            };
        //Update the list of example projects
        case types.SYNC_EXAMP_PROJ:
            return {
                ...state,
                exampleProjs: action.payload
            };
        //Delete a specific user project
        case types.DELETE_PROJ:
            let projs = [];
            projs = state.userProjs.filter(x => {
                return x._id !== action._id;
            });
            return {
                ...state,
                userProjs: projs
            };
        default:
            return state;
    }
}
