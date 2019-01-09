import { scenes } from '../firebase.js';
import { loadSettings } from './sceneActions';
import { DEF_SETTINGS } from '../reducers/scene';

export const EDITOR_RENDER = 'EDITOR_RENDER';
export const EDITOR_REFRESH = 'EDITOR_REFRESH';
export const EDITOR_RECOVER = 'EDITOR_RECOVER';

/**
 * @function - Sends a signal to the reducer to render the scene
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
* @summary - This does an async fetch to Firebase to grab the scene, then
* dispatches the neccessary functions to update the state.
*
*/
export function fetchScene(id, uid = "anon") {
  return (dispatch) => {  // Return a func that dispatches events after async
    scenes.doc(id).get().then((scene) => {
      let data = scene.data();
      if (data && data.code) { // If it worked
        // render the editor
        dispatch(render(data.code, uid || 'anon'));

        // Use default for eventual consistency in db
        let settings = DEF_SETTINGS;

        // if the incoming scene has a settings, merge default with incoming
        if (data.settings) {
          settings = { ...settings, ...data.settings };
        }

        // apply settings, set id to 0 if not the owner of the scene
        dispatch(loadSettings({ ...settings, id: data.uid === uid ? id : 0 }));

      } else { // If no scene is found and we are not looking for 404 return 404
        if (id !== 'error-404') {
          window.location.href = window.origin + '/error-404';
        }
        console.error("Unable to fetch scene:" + id);
      }
    });
  };
}
