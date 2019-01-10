import './editorActions';
import { render } from './editorActions';

export const SYNC_COURSES = 'SYNC_COURSES';
export const LOAD_COURSE = 'LOAD_COURSE';
export const LOAD_LESSON = 'LOAD_LESSON';
export const SET_INDEX = 'SET_INDEX';

const courseRef = '/apiv1/courses/';
const lessonRef = '/apiv1/lessons/id/';
const getFirst = '?getLesson=true';

//Course Actions

export function fetchCourses() {
    return (dispatch) => {
        fetch(courseRef, {
            headers: { 'content-type': 'application/json' },
        })
            .then(response => {
                if (response.status === 500) { return Promise.reject(response.statusText) }
                response.json().then(json => ({ json, response })).then(({ json, response }) => {
                    if (!response.ok) {
                        return Promise.reject(json);
                    }
                    dispatch(syncCourses(json));
                })
            });
    };
}

export function syncCourses(payload) {
    return { type: SYNC_COURSES, payload: payload };
}

export function fetchCourse(courseId) {
    return (dispatch) => {
        fetch(courseRef + courseId + getFirst, {
            headers: { 'content-type': 'application/json' },
        })
            .then(response => {
                if (response.status === 500) { return Promise.reject(response.statusText) }
                response.json().then(json => ({ json, response })).then(({ json, response }) => {
                    if (!response.ok) {
                        return Promise.reject(json);
                    }
                    dispatch(loadCourse(json));
                    dispatch(loadLesson(json.firstLesson));
                    dispatch(render(json.firstLesson.code || ""));
                })
            });
    };
}

export function loadCourse(course) {
    return {
        type: LOAD_COURSE,
        payload: course
    };
}

//Lesson Actions
export function fetchLesson(lvlId) {
    return (dispatch) => {
        fetch(lessonRef + lvlId, {
            headers: { 'content-type': 'application/json' },
        })
            .then(response => {
                if (response.status === 500) { return Promise.reject(response.statusText) }
                response.json().then(json => ({ json, response })).then(({ json, response }) => {
                    if (!response.ok) {
                        return Promise.reject(json);
                    }
                    dispatch(loadLesson(json));
                    dispatch(render(json.code || ""));
                })
            });
    };
}

export function nextLesson(currentIndex, nextID) {
    return (dispatch) => {
        dispatch(setCurrentIndex(currentIndex + 1));
        dispatch(fetchLesson(nextID));
    }
}

export function previousLesson(currentIndex, nextID) {
    return (dispatch) => {
        dispatch(setCurrentIndex(currentIndex - 1));
        dispatch(fetchLesson(nextID));
    }
}

export function setCurrentIndex(newIndex) {
    return {
        type: SET_INDEX,
        payload: newIndex
    };
}

export function loadLesson(lesson) {
    return {
        type: LOAD_LESSON,
        payload: lesson
    };
}
