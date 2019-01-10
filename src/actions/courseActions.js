import { render } from './editorActions';

export const SYNC_COURSES = 'SYNC_COURSES';
export const LOAD_COURSE = 'LOAD_COURSE';
export const LOAD_LESSON = 'LOAD_LESSON';
export const SET_INDEX = 'SET_INDEX';

const courseRef = '/apiv1/courses/';
const lessonRef = '/apiv1/lessons/id/';
const getFirst = '?getLesson=true';
const header = { headers: { 'content-type': 'application/json' } };

//Course Actions
export function fetchCourses() {
  return (dispatch) => {
    fetch(courseRef, header)
      .then(response => {
        response.json()
          .then(json => { dispatch(syncCourses(json)); })
          // likely a parsing issue
          .catch(err => { console.error(err); });
      })
      // likely an HTTP error
      .catch(err => { console.error(err); });
  };
};

export function syncCourses(payload) {
  return { type: SYNC_COURSES, payload: payload };
}

export function fetchCourse(courseId) {
  return (dispatch) => {
    fetch(courseRef + courseId + getFirst, header)
      .then(response => {
        response.json()
          .then(json => {
            dispatch(loadCourse(json));
            dispatch(loadLesson(json.firstLesson));
            dispatch(render(json.firstLesson.code || ""));
          })
          .catch(err => { console.error(err); });
      })
      .catch(err => { console.error(err); });
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
    fetch(lessonRef + lvlId, header)
      .then(response => {
        response.json()
          .then(json => {
            dispatch(loadLesson(json));
            dispatch(render(json.code || ""));
          })
          .catch(err => { console.error(err); });
      })
      .catch(err => { console.error(err); });
  };
}

// Frontend disables option if out of bounds
export function nextLesson(currentIndex, nextID) {
  return (dispatch) => {
    dispatch(setCurrentIndex(currentIndex + 1));
    dispatch(fetchLesson(nextID));
  };
}

// Frontend disables option if out of bounds
export function previousLesson(currentIndex, nextID) {
  return (dispatch) => {
    dispatch(setCurrentIndex(currentIndex - 1));
    dispatch(fetchLesson(nextID));
  };
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
