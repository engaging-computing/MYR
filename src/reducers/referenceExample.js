import * as types from "../constants/ActionTypes";

const initial_state = {
    functionName: "",
    functionParams: [],
    type: "Unknown",
    info: "Please wait.",
    suggestedCourse: null,
    suggestedCourseName: null,
    code: "//Loading"
};


/**
 * Reference Example reducer
 */
export default function referenceExample(state = initial_state, action) {
    switch (action.type) {
        //Load specific example scene supplied
        case types.LOAD_REF_EX:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
