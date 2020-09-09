import * as types from "../constants/ActionTypes";

const initial_state = {
    collections: [],
    collection: []
};

export default function classes(state = initial_state, action) {
    switch (action.type) {
        case types.SYNC_CLASSES:
            return {
                ...state,
                collections: action.payload
            };
        case types.SYNC_CLASS:
            return {
                ...state,
                collection: action.payload
            };
        case types.DELETE_CLASS:
            let userClasses = [];
            userClasses = state.collections.filter(x => {
                return x._id !== action.id;
            });
            return {
                ...state,
                collections: userClasses
            };
        default:
            return state;
    }
}
