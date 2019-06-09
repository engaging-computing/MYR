import { render } from './editorActions';

import * as types from '../constants/ActionTypes';

const refExRef = '/apiv1/referenceExamples/';
const header = { headers: { 'content-type': 'application/json' } };
const problem = {
    name: "Error",
    type: "Unknown",
    info: "An unknown error occured. Please try refreshing the page",
    suggestedCourse: null,
    code: ""
};

//Lesson Actions
export function fetchReferenceExample(funcName) {
    return (dispatch) => {
        fetch(refExRef + funcName, header)
            .then(response => {
                response.json()
                    .then(json => {
                        dispatch(loadReferenceExample(json));
                        dispatch(render(json.code || ""));
                    })
                    .catch(err => {
                        dispatch(loadReferenceExample(problem));
                        console.error(err);
                    });
            })
            .catch(err => {
                dispatch(loadReferenceExample(problem));
                console.error(err);
            });
    };
}

export function loadReferenceExample(refEx) {
    return {
        type: types.LOAD_REF_EX,
        payload: refEx
    };
}

export default {
    loadReferenceExample,
    fetchReferenceExample
};