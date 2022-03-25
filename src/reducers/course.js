import * as types from "../constants/ActionTypes";

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

/**
 *  Course Reducer 
 */
export default function course(state = initial_state, action) {
    let payload;
    switch (action.type) {
        //Update list of courses
        case types.SYNC_COURSES:
            return {
                ...state,
                courses: action.payload
            };
        //Load a course
        case types.LOAD_COURSE:
            return {
                ...state,
                course: action.payload
            };
        //Load a lesson
        case types.LOAD_LESSON:
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
        //Set the index for the current lesson (Where the lesson is)
        case types.SET_INDEX:
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
