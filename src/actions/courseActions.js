import './editorActions';
import { render } from './editorActions';
import { loadLesson } from './lessonActions';

// export const LOAD_COURSES = 'LOAD_COURSES';
// export const ASYNC_COURSES = 'ASYNC_COURSES';
export const SYNC_COURSES = 'SYNC_COURSES';
export const LOAD_COURSE = 'LOAD_COURSE';

const ref = '/apiv1/courses/';
const getFirst = '?getLesson=true';

export function fetchCourses() {
    return (dispatch) => {
        fetch(ref, {
            headers: { 'content-type': 'application/json' },
        })
            .then(response => response.json().then(json => ({ json, response })))
            .then(({ json, response }) => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                dispatch(syncCourses(json));
            });
    };
}

export function syncCourses(payload) {
    return { type: SYNC_COURSES, payload: payload };
}

export function fetchCourse(courseId) {
    return (dispatch) => {
        fetch(ref + courseId + getFirst, {
            headers: { 'content-type': 'application/json' },
        })
            .then(response => response.json().then(json => ({ json, response })))
            .then(({ json, response }) => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                dispatch(loadCourse(json));
                dispatch(loadLesson(json.firstLesson));
                dispatch(render(json.firstLesson.code || ""));
            });
    };
}

export function loadCourse(course) {
    return {
        type: LOAD_COURSE,
        payload: course
    };
}