import { render, updateSavedText  } from "./editorActions";

import * as types from "../constants/ActionTypes";

import * as sceneActions from "./sceneActions";

const courseRef = "/apiv1/courses/";
const header = { headers: { "content-type": "application/json" } };
const noLessons = {
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

/*
 * Course Actions
 */
/**
 *  Fetch all the courses available
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

/**
 * Sends a signal to the reducer to synchronize the courses
 * 
 * @param {*} payload List of courses retrieved
 * 
 * @returns reducer action object with type: SYNC_COURSE and payload
 */
export function syncCourses(payload) {
    return { type: types.SYNC_COURSES, payload: payload };
}

/**
 * Fetch specific course
 * 
 * @param {string} courseId id of the course getting
 */
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
                        dispatch(sceneActions.loadSettings(json.lessons[0].settings || {}));
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

/**
 * Sends signal to the reducer to load the course retrieved
 * 
 * @param {*} course Data of course retrieved
 * @returns {object} reducer action obj with type: LOAD_COURSE and payload
 */
export function loadCourse(course) {
    return { type: types.LOAD_COURSE, payload: course };
}

/*
 * Lesson Actions
 */
/**
 * Fetch the lesson that is supplied by the parameter. 
 * @param {*} json Lesson data
 */
export function fetchLesson(json) {
    return (dispatch) => {
        dispatch(loadLesson(json));
        dispatch(sceneActions.resetSettings());
        dispatch(sceneActions.loadSettings(json.settings || {}));
        dispatch(render(json.code || ""));
        dispatch(updateSavedText(json.code || ""));
        dispatch(sceneActions.nameScene(json.name));
    };
}

/**
 * Sends signal to the reducer to load a new lesson supplied by parameter
 * 
 * @param {object} lesson Lesson data
 * @returns reducer action obj with type: LOAD_LESSON and payload: lesson
 */
export function loadLesson(lesson) {
    return { type: types.LOAD_LESSON, payload: lesson };
}

/**
 * Increment the lesson index and load the next lesson.
 *      Frontend disables option if out of bounds
 * 
 * @param {number} currentIndex current index of the course
 * @param {object} next Object of lesson to be load next
 */
export function nextLesson(currentIndex, next) {
    return (dispatch) => {
        dispatch(setCurrentIndex(currentIndex + 1));
        dispatch(fetchLesson(next));
    };
}

/**
 * Decrement the lesson index and load the previous lesson.
 *      Frontend disables option if out of bounds
 * 
 * @param {number} currentIndex current index of the course
 * @param {object} prev Object of lesson to be load previous
 */
export function previousLesson(currentIndex, prev) {
    return (dispatch) => {
        dispatch(setCurrentIndex(currentIndex - 1));
        dispatch(fetchLesson(prev));
    };
}

/**
 * Sends signal to the reducer to update the current index of the Course
 * 
 * @param {number} newIndex New index to be set
 * @returns {object} reducer action obj with type: SET_INDEX and payload: newIndex
 */
export function setCurrentIndex(newIndex) {
    return { type: types.SET_INDEX, payload: newIndex };
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