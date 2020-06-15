import { loadScene } from "./sceneActions";
import { DEF_SETTINGS } from "../reducers/scene";
import * as types from "../constants/ActionTypes";

const sceneRef = "/apiv1/scenes";

/**
 * @function - Sends a signal to the reducer to render the scene
 *
 * @param {string} text - Text from the Ace Editor component
 *
 * @returns - reducer action obj with action type and text
 */
export function render(text, uid) {
    return { type: types.EDITOR_RENDER, text, uid };
}

/**
 * @function - Sends a signal to the reducer to refresh with the given text
 *
 * @param {string} text - Text from the Ace Editor component
 *
 * @returns - reducer action obj with action type and text
 */
export function refresh(text, uid) {
    return { type: types.EDITOR_REFRESH, text, uid };
}

/**
 * @function - Sends a signal to the reducer to 'rewind' until last stable render
 *
 * @returns - reducer action obj with action type
 */
export function recover() {
    return { type: types.EDITOR_RECOVER };
}

/**
* @summary - This does an async fetch to Firebase to grab the scene, then
* dispatches the necessary functions to update the state.
*
*/
export function fetchScene(id, uid = "anon") {
    return (dispatch) => {  // Return a func that dispatches events after async
        fetch(`${sceneRef}/id/${id}`, {redirect: "follow"}).then((response) =>{
            if(response.redirected && id !== "error-404"){
                let url = response.url.split("/");
                window.location.assign(`${window.origin}/scene/${url[url.length - 1]}?redirected=true`);
                return;
            }

            if(response.status !== 200){
                if(response.status === 404){
                    window.location.assign(window.origin + "/error-404");
                }else{
                    console.error("Error retrieving scene. Reason: ", response.statusText);
                }
                return;
            }

            response.json().then((json) =>{
                if(json.code){
                    dispatch(render(json.code, uid || "anon"));
                    dispatch(updateSavedText(json.code));
                    let settings = DEF_SETTINGS;

                    if(json.settings){
                        settings = {...settings, ...json.settings};
                    }

                    dispatch(loadScene({
                        name: json.name ? json.name : "",
                        id: json.uid === uid ? id : 0,
                        ts: json.updateTime ? json.updateTime : Date.now(),
                        desc: json.desc ? json.desc : "",
                        settings: settings
                    }));
                }
            });
        });
    };
}

/**
* @function - Sends a signal to the reducer to update the savedText when user try to save or open scene/course
*
* @returns - reducer action obj with action type
*/

export function updateSavedText(savedText){
    return {type: types.EDITOR_UPDATE_SAVEDTEXT, savedText};
}

export function addPassword(payload) {
    return { type: types.ADD_PW, payload };
}

export default {
    render,
    refresh,
    recover,
    fetchScene,
    addPassword,
    updateSavedText,
};