import { render, updateSavedText  } from "./editorActions";

import * as types from "../constants/ActionTypes";

import * as sceneActions from "./sceneActions";

const courseRef = "/apiv1/courses/";
const header = { headers: { "content-type": "application/json" } };
let noLessons = {
    name: "",
    id: -1,
    prompt: "There are no lessons in this course",
    code: ""
};
const problem = {
    name: "Error",
    id: -1,
    prompt: "There has been an error. Please try reloading the page.",
    code: ""
};

/**
 * Course Actions
 */
export function fetchCourses() {
    return (dispatch) => {
        fetch(courseRef, header)
            .then(response => {
                response.json()
                    .then(json => { dispatch(syncCourses(json)); })
                    // likely a parsing issue
                    .catch(err => {
                        dispatch(loadLesson(problem));
                        console.error(err);
                    });
            })
            // likely an HTTP error
            .catch(err => {
                dispatch(loadLesson(problem));
                console.error(err);
            });
    };
}

export function syncCourses(payload) {
    return { type: types.SYNC_COURSES, payload: payload };
}

export function fetchCourse(courseId) {
    return (dispatch) => {
        fetch(courseRef + courseId, header)
            .then(response => {
                response.json()
                    .then(json => {
                        document.title = json.name + " Course | MYR";
                        dispatch(loadCourse(json));

                        //Make sure that the course is not empty
                        if(json.lessons.length <= 0){
                            noLessons.name = json.name; 
                            dispatch(loadLesson(noLessons));
                            return;
                        }

                        dispatch(loadLesson(json.lessons[0] || ""));
                        dispatch(render(json.lessons[0].code || ""));
                        dispatch(updateSavedText(json.lessons[0].code || ""));
                        dispatch(sceneActions.setNameDesc(
                            {
                                name: json.lessons[0].name,
                                desc: "This scene was saved from the course: " + json.name
                            }));   
                    })
                    .catch(err => {
                        console.error(err);
                        dispatch(loadLesson(problem));
                    });
            })
            .catch(err => {
                console.error(err);
                dispatch(loadLesson(problem));
            });
    };
}

export function loadCourse(course) {
    return {
        type: types.LOAD_COURSE,
        payload: course
    };
}

/**
 * Lesson Actions
 */
export function fetchLesson(json) {
    return (dispatch) => {
        dispatch(loadLesson(json));
        dispatch(render(json.code || ""));
        dispatch(updateSavedText(json.code || ""));
        dispatch(sceneActions.nameScene(json.name));
    };
}

/**
 * Frontend disables option if out of bounds
 * 
 * @param {*} currentIndex !!!DESCRIPTION NEEDED!!!
 * @param {*} next !!!DESCRIPTION NEEDED!!!
 */
export function nextLesson(currentIndex, next) {
    return (dispatch) => {
        dispatch(setCurrentIndex(currentIndex + 1));
        dispatch(fetchLesson(next));
    };
}

/**
 * Frontend disables option if out of bounds
 * 
 * @param {*} currentIndex !!!DESCRIPTION NEEDED!!!
 * @param {*} prev !!!DESCRIPTION NEEDED!!!
 */
export function previousLesson(currentIndex, prev) {
    return (dispatch) => {
        dispatch(setCurrentIndex(currentIndex - 1));
        dispatch(fetchLesson(prev));
    };
}

export function setCurrentIndex(newIndex) {
    return {
        type: types.SET_INDEX,
        payload: newIndex
    };
}

export function loadLesson(lesson) {
    return {
        type: types.LOAD_LESSON,
        payload: lesson
    };
}

export default {
    fetchCourses,
    syncCourses,
    nextLesson,
    previousLesson,
    fetchCourse,
    setCurrentIndex,
    loadLesson,
    fetchLesson,
    loadCourse
};