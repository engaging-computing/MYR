import { SYNC_COURSES, LOAD_COURSE } from '../actions/courseActions';

const initial_state = {
    courses: [],
    course: {}
};

export default function course(state = initial_state, action) {
    switch (action.type) {
        case SYNC_COURSES:
            return {
                ...state,
                courses: action.payload
            };
        case LOAD_COURSE:
            return {
                ...state,
                course: action.payload
            }
        default:
            return state;
    }
}
