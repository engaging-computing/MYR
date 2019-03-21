import { SYNC_CLASSES, SYNC_CLASS, DELETE_CLASS } from '../actions/classroomActions';

const initial_state = {
    classrooms: [],
    classroom: []
};

export default function classes(state = initial_state, action) {
    switch (action.type) {
        case SYNC_CLASSES:
            return {
                ...state,
                classrooms: action.payload
            };
        case SYNC_CLASS:
            return {
                ...state,
                classroom: action.payload
            };
        case DELETE_CLASS:
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
