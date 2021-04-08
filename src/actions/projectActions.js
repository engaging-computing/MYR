import * as types from "../constants/ActionTypes";
import { saveAs } from "file-saver";

const sceneRef = "/apiv1/scenes";
const previewRef = "/apiv1/preview/id";

export function asyncUserProj(id) {
    // fetch user's project
    return (dispatch) => {
        if (id) {
            fetch(`${sceneRef}/`, {headers: {"x-access-token": id}}).then((response) =>{
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

export function syncUserProj(payload) {
    return { type: types.SYNC_USER_PROJ, payload: payload };
}

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

export function syncExampleProj(payload) {
    return { type: types.SYNC_EXAMP_PROJ, payload: payload };
}

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
 * Adds an array of scenes to the redux store without removing existing entries
 * 
 * @param {Object[]} payload An array of scenes to be added to the Redux Store
 * 
 * @returns {Object} A object with the type of "ADD_PROJS" and the payload being the parameter payload
 */
export function syncAddUserProjs(payload) {
    return {type: types.ADD_PROJS, payload: payload};
}

/**
 * Requests the backend to export a specific or all of a user's scenes
 * 
 * @param {string} uid The JWT token for the user, this should be from this.props.user.uid in most components
 * @param {string} scene The ObjectID of the scene to be exported, if undefined all scenes will be exported
 */
export function exportScenes(uid, scene = undefined) {
    return async () => {
        let param = "";
        if(scene) {
            param = `?id=${scene}`;
        }

        let resp = await fetch(`/apiv1/scenes/export${param}`, {headers: {"x-access-token": uid}});
        switch(resp.status) {
            case 204:
                alert("There are no scenes saved for you to export!");
                break;
            case 200:
                let data = await resp.json();
                saveAs(new Blob([JSON.stringify(data)]), "MYR-export.json", {
                    type: "application/json"
                });
                break;
            default:
                alert("There was a server error fetching your scenes.  Try again later");
        }
    };
}

/**
 * Requests the backend to import all scenes from a given file
 * 
 * @param {string} uid The JWT token for the user, this should be from this.props.user.uid in most components
 * @param {FileList} fileEvent A list of files that the user uploaded, currently there is support for only one.
 */
export function importScenes(uid, fileEvent) {
    return async (dispatch) => {
        const file = fileEvent.target.files[0];
        let data = await file.text();
        let json;
        try{
            json = JSON.parse(data);
        }catch(err) {
            alert("Invalid file uploaded");
            console.error(err);
            return;
        }

        const headers = {
            "Content-Type": "application/json",
            "x-access-token": uid
        };

        let resp = await fetch(`${sceneRef}/import`, {headers: headers, body: JSON.stringify(json), method: "POST"});
        let respBody = await resp.json();

        if(resp.status !== 200) {
            alert(respBody.message);
            return;
        }

        respBody.imported.forEach(element => {
            element.url = `${previewRef}/${element._id}`;
        });

        dispatch(syncAddUserProjs(respBody.imported));
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
    importScenes,
    exportScenes
};