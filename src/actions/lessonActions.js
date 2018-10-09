import './editorActions';
import { render } from './editorActions';

export const LOAD_LESSON = "LOAD_LESSON";

const ref = '/apiv1/lessons/id/';

const refFirst = '/apiv1/lessons/';

export function fetchFirstLesson(lvlId) {
  return (dispatch) => {
    fetch(refFirst + lvlId, {
      headers: { 'content-type': 'application/json' },
    })
      .then(response => response.json().then(json => ({ json, response })))
      .then(({ json, response }) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        dispatch(loadLesson(json));
        dispatch(render(json.code || ""));
      })
      .then(
        response => response,
        error => error
      );
  };
}

export function fetchLesson(lvlId) {
  return (dispatch) => {
    fetch(ref + lvlId, {
      headers: { 'content-type': 'application/json' },
    })
      .then(response => response.json().then(json => ({ json, response })))
      .then(({ json, response }) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        dispatch(loadLesson(json));
        dispatch(render(json.code || ""));
      })
      .then(
        response => response,
        error => error
      );
  };
}

function loadLesson(lesson) {
  return {
    type: LOAD_LESSON,
    payload: lesson
  };
}
