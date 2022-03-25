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
        case types.SYNC_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            };
        //Load a collection  
        case types.SYNC_COLLECTION:
            return {
                ...state,
                collection: action.payload
            };
        //Delete the collection from list
        case types.DELETE_COLLECTION:
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
