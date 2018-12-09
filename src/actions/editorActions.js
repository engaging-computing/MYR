import { scenes } from '../firebase.js';
import { nameScene, loadScene } from './sceneActions';

export const EDITOR_RENDER = 'EDITOR_RENDER';
export const EDITOR_REFRESH = 'EDITOR_REFRESH';
export const EDITOR_RECOVER = 'EDITOR_RECOVER';


/**
 * @function - Sends a signal to the reducer to render the Aframe scene with the given text
 *
 * @param {string} text - Text from the Ace Editor component
 *
 * @returns - reducer action obj with action type and text
 */
export function render(text, uid) {
  return { type: EDITOR_RENDER, text, uid };
}

/**
 * @function - Sends a signal to the reducer to refresh with the given text
 *
 * @param {string} text - Text from the Ace Editor component
 *
 * @returns - reducer action obj with action type and text
 */
export function refresh(text, uid) {
  return { type: EDITOR_REFRESH, text, uid };
}

/**
 * @function - Sends a signal to the reducer to 'rewind' until last stable render
 *
 * @returns - reducer action obj with action type
 */
export function recover() {
  return { type: EDITOR_RECOVER };
}

/**
* @summary - This does an async fetch to Firebase to grab the scene, then dispatches
* the neccessary functions to update the state.
*
*/
export function fetchScene(id, uid = "anon") {
  return (dispatch) => {  // Return a functions that dispatches events after async
    scenes.doc(id).get().then((scene) => {
      let data = scene.data();
      if (data && data.pw) {
        let pw = prompt("Please enter the PW");
        if (pw !== data.pw) { return; }
      };
      if (data && data.code) { // If it worked
        // render the editor
        dispatch(render(data.code, uid || 'anon'));
        // store the name of the scene
        dispatch(nameScene(data.name));

        if (data.uid !== uid) {
          // If it isn't your scene, load 0 as scene id so we save as not save
          dispatch(loadScene(0));
        } else {
          // Otherwise save the scenes
          dispatch(loadScene(id));
        }
      } else {
        if (id !== 'error-404') {
          window.location.href = window.origin + '/error-404';
        }
        console.error("Unable to fetch scene:" + id);
      }
    });
  };
}
