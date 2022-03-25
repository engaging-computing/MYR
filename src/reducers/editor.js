import * as types from "../constants/ActionTypes";

import Myr from "../myr/Myr";

const initial_state = {
    text: "",
    savedText: "",
    objects: [],
    assets: [],
    message: {
        text: "",
        time: 0
    }
};

/**
* @summary - Snapshots is an array of objects that record each time the user tries to render
*/
let snapshots = [
    {
        timestamp: Date.now(),
        text: `${initial_state.text}`,
        error: false
    }
];


const m = new Myr();
m.init();
// window.m = m; // Use this to attach it to the window for debugging

/**
 * Conver the MYR code supplied from the editor to a function so it can be executed
 *      ESLint doesn't like this but it is better than eval
 * @param {string} text MYR code supplied from editor
 */
function noEvalEvaluation(text) {
    // eslint-disable-next-line
    // let func = Function(`'use strict'; ${m.infiniteLoopDetector.wrap(text)}`);
    // eslint-disable-next-line
    let func = Function(`'use strict'; ${text}`);
    return func;
}


/**
 * Editor Reducer
 */
export default function editor(state = initial_state, action) {
    switch (action.type) {
        //Handles the evaluation of the MYR code in editor
        case types.EDITOR_RENDER:
            m.reset();

            // build an object to save the snap
            let snap = {
                user: action.uid ? action.uid : "unknown",
                timestamp: Date.now(),
                text: action.text,
                error: false
            };

            let message = {
                text: "",
                time: Date.now()
            };

            try {
                let func = noEvalEvaluation(action.text);
                func();
            }
            catch (err) {
                // Notify that eval failed
                console.error("Eval failed: " + err);
                message = { ...message, text: "Eval failed: " + err };
                snap = { ...snap, error: true };
            }

            snapshots.push(snap);

            fetch("/apiv1/snapshots/", {
                headers: new Headers({ "Content-Type": "application/json" }),
                method: "post",
                body: JSON.stringify(snap)
            });

            return {
                ...state,
                text: action.text,
                objects: m.els || [],
                assets: m.assets || [],
                message
            };
        //Update the text editor
        case types.EDITOR_REFRESH:
            m.reset();
            return {
                ...initial_state,
                text: action.text,
                savedText: state.savedText,
            };
        //Recover the code 
        case types.EDITOR_RECOVER:
            // Start at last snap
            let stableIndex = snapshots.length - 1;
            // Work backwards until we find a non-error snap
            while (snapshots[stableIndex].error === true) {
                stableIndex--;
            }

            // Call editor function again with new params
            return editor({ ...state }, { type: types.EDITOR_RENDER, text: snapshots[stableIndex].text });
        //Update save text. savedText use to check whether user made changes to the scene
        case types.EDITOR_UPDATE_SAVEDTEXT:
            return {
                ...state,
                savedText: action.savedText,
            };
        default:
            return state;
    }
}