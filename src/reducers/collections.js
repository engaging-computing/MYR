import * as types from "../constants/ActionTypes";

const initial_state = {
    collections: [],
    collection: []
};

/**
 * Collection Reducer
 */
export default function classes(state = initial_state, action) {
    switch (action.type) {
        //Update list of collections
        case types.SYNC_CLASSES:
            return {
                ...state,
                collections: action.payload
            };
        //Load a collection  
        case types.SYNC_CLASS:
            return {
                ...state,
                collection: action.payload
            };
        //Delete the collection from list
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
