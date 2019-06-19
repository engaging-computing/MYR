import * as types from "../constants/ActionTypes";

const initial_state = {
    classrooms: [],
    classroom: []
};

export default function classes(state = initial_state, action) {
    switch (action.type) {
    case types.SYNC_CLASSES:
        return {
            ...state,
            classrooms: action.payload
        };
    case types.SYNC_CLASS:
        return {
            ...state,
            classroom: action.payload
        };
    case types.DELETE_CLASS:
        let userClasses = [];
        userClasses = state.classrooms.filter(x => {
            return x.id !== action.id;
        });
        return {
            ...state,
            classrooms: userClasses
        };
    default:
        return state;
    }
}
