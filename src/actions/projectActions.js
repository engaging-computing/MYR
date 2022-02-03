import * as types from "../constants/ActionTypes";
import {saveAs} from "file-saver";

const sceneRef = "/apiv1/scenes";
const previewRef = "/apiv1/preview/id";

/**
 * Imports a JSON document to the backend for the provided user.
 * Only valid scenes are imported, invalid ones are skipped
 * 
 * @param {string} uid A JWT token for authenticating with the backend server
 * @param {FileList} projList A list of files from a input taking file types
 */
export function importProj(uid, projList) {
    return async (dispatch) => {
        const text = await projList[0].text();
        const resp = await fetch(`${sceneRef}/import`, {method: "POST", body: text, headers: {
            "x-access-token": uid,
            "Content-Type": "application/json"
        }});
        const ids = await resp.json();
        let new_scenes = [];
        for(let id of ids.importedScenes) {
            const id_resp = await fetch(`${sceneRef}/id/${id}`);
            const scene = await id_resp.json();
            scene.url = `${previewRef}/${id}`;
            new_scenes.push(scene);
        }

        dispatch(syncImportProj(new_scenes));
    };
}

export function exportProj(uid, id = undefined) {
    return async () => {
        let query = "";
        if(id) {
            query = `?id=${id}`;
        }

        fetch(`${sceneRef}/export${query}`, {headers: {"x-access-token": uid}}).then(async (resp) => {
            if(resp.status === 200) {
                const result = await resp.json();
                const bytes = new TextEncoder().encode(JSON.stringify(result));
                saveAs(new Blob([bytes], {type: "application/json;charset=utf-8"}), "MYR-export.json");
            }
        });
    };
}


/**
 * Retrieved the list of user scenes
 * 
 * @param {*} uid A JWT token to authenticate with the backend
 */
export function asyncUserProj(uid) {
    // fetch user's project
    return (dispatch) => {
        if (uid) {
            fetch(`${sceneRef}/`, {headers: {"x-access-token": uid}}).then((response) =>{
                if(response.status === 200){
                    response.json().then((json) =>{
                        json.forEach(element => {
                            element.url = `${previewRef}/${element._id}`;
                        });
                        dispatch(syncUserProj(json));
                    });
                }
            });
        }
    };
}

/**
 * Returns a dispatch trigger to import a list of scenes into the user's
 * project state in redux.
 * @param {Object[]} payload An array of scene objects to be added to the state
 * @returns 
 */
export function syncImportProj(payload) {
    return { type: types.IMPORT_PROJ, payload: payload };
}


/**
 * Sends signal to the reducer to sync the user project
 * 
 * @param {*} payload list of user projects
 * 
 * @returns reducer action obj with type: SYNC_USER_PROJ wiht payload
 */
export function syncUserProj(payload) {
    return { type: types.SYNC_USER_PROJ, payload: payload };
}

/**
 * Fetch a eample scenes from the backend
 */
export const asyncExampleProj = () => {
    // fetch example projects
    return (dispatch) => {
        fetch(`${sceneRef}/example`).then((response) =>{
            if(response.status === 200){
                response.json().then((json) =>{
                    json.forEach(element => {
                        element.url = `${previewRef}/${element._id}`;
                    });
                    dispatch(syncExampleProj(json));
                });
            }
        });
    };
};


/**
 * Sends signal to the reducer to sync the example project
 * @param {*} payload List of the example project
 * 
 * @returns reducer action obj with type: SYNC_EXAMP_PROJ with payload
 */
export function syncExampleProj(payload) {
    return { type: types.SYNC_EXAMP_PROJ, payload: payload };
}

/**
 * Delete the specify user project
 * 
 * @param {*} uid  A JWT token to authenticate with the backend
 * @param {string} id   Scene id to be deleted 
 * @param {string} name Name of the scene
 */
export function deleteProj(uid, id, name) {
    return (dispatch) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            //Delete Scene and Image
            fetch(`${sceneRef}/id/${id}`, {method: "delete", headers: {"x-access-token": uid}}).then(response => {
                if(response.status === 204){
                    // Delete Document
                    dispatch({ type: types.DELETE_PROJ, _id: id });
                    if (window.location.href === `${window.origin}/scene/${id}` || window.location.href === `${window.origin}/scene/${id}/`) {
                        window.location.assign(window.origin);
                    }
                    return true;
                }else{
                    return response.json();
                }
            }).then((body) => {
                if(body !== true){
                    console.error("Error deleting scene");
                    console.error(body);

                    alert(`Error Deleting scene ${name}`);
                }
            });
        }
    };
}

/**
 * Saves a scene to MongoDB
 * 
 * @param {*} uid The id of the logged in user 
 * @param {*} scene JSON data of the scene to be saved
 * @param {*} img JPEG Image file of the Scene
 * @param {*} sceneID sceneId to be updated, if undefined, creates a new scene
 * 
 * @returns {*} The ID of the saved scene
 */
export async function save(uid, scene, img, sceneID=undefined){
    let id = undefined;
    let url = `${sceneRef}`;
    let method = "POST";
    const headers = {
        "Content-Type": "application/json",
        "x-access-token": uid
    };

    if(sceneID !== undefined){
        method = "PUT";
        url = `${sceneRef}/id/${sceneID}`;
    }
    let resp = await fetch(url, {method: method, body: JSON.stringify(scene), headers: headers});
    
    if(resp.status === 401){
        method = "POST";
        resp = await fetch(sceneRef, {method: method, body: JSON.stringify(scene), headers: headers});
    }

    if(resp.status !== 201 && resp.status !== 200){
        console.error("Could not create new Scene, are you sure you're logged in?");
        return false;
    }
    let json = await resp.json();
    id = json._id;

    if(id === ""){
        console.error("Error receiving scene id from server");
        return false;
    }

    let data = {data: img};
    await fetch(`${previewRef}/${id}`, {method: method, body: JSON.stringify(data), 
        headers: {"Content-Type": "application/json", "x-access-token": uid}})
        .then((resp) => {
            if(resp.status !== 201 && resp.status !== 204){
                console.error("Error sending preview image to server: ", resp.status, resp.statusText);
            }
        });
    return id;
}

export default {
    asyncUserProj,
    syncUserProj,
    asyncExampleProj,
    syncExampleProj,
    deleteProj,
    exportProj,
    importProj
};