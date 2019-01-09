import { SYNC_COURSES, LOAD_COURSE, LOAD_LESSON, SET_INDEX } from '../actions/courseActions';

const initial_state = {
    courses: [],
    course: {},
    currentIndex: 0,
    currentLesson: {
        name: "Loading....",
        id: -1,
        prompt: "Please wait",
        code: "// Loading"
    }
};

export default function course(state = initial_state, action) {
    let payload;
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
            };
        case LOAD_LESSON:
            payload = action.payload;
            return {
                ...state,
                currentLesson: {
                    name: payload.name,
                    id: payload._id,
                    prompt: payload.prompt,
                    code: payload.code
                }
            };
        case SET_INDEX:
            return {
                ...state,
                currentIndex: action.payload,
                currentLesson: {
                    name: state.name,
                    id: state._id,
                    prompt: state.prompt,
                    code: state.code
                }
            };
        default:
            return state;
    }
}
