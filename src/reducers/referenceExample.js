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

export default function referenceExample(state = initial_state, action) {
    switch (action.type) {
    case types.LOAD_REF_EX:
        return {
            ...state,
            ...action.payload
        };
    default:
        return state;
    }
}
