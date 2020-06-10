import * as types from "../constants/ActionTypes";

const sceneRef = "/apiv1/scenes";
const previewRef = "/apiv1/scenes/preview";

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
        fetch(`${sceneRef}/`, {headers: {"x-access-token": "1"}}).then((response) =>{
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
            // Delete Image
            fetch(`${previewRef}/${id}`, {method: "delete", headers: {"x-access-token": uid}})
                .then((response) =>{
                    if(response.status !== 204){
                        console.error("Error removing image: ", response.status);
                        return true;
                    }
                    return false;
                }).then((err) =>{
                    if(!err){
                        fetch(`${sceneRef}/id/${id}`, {method: "delete", headers: {"x-access-token": uid}}).then((response) => {
                            if(response.status !== 204){
                                console.error("Error removing document: ", response.status);
                            }
                            // If deleting current project, redirect to home
                            else if (window.location.href === `${window.origin}/scene/${id}` || window.location.href === `${window.origin}/scene/${id}/`) {
                                window.location.assign(window.origin);
                            }
                        }).catch((error) => {
                            console.error("Error removing document: ", error);
                        });
                    }
                });

            // Delete Document
            dispatch({ type: types.DELETE_PROJ, _id: id });
        }
    };
}

/**
 * Saves a scene to MongoDB
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

    if(sceneID !== undefined){
        method = "PUT";
        url = `${sceneRef}/id/${sceneID}`;
    }
    await fetch(url, 
        {method: method, body: JSON.stringify(scene),  
            headers:{"Content-Type": "application/json", "x-access-token": uid}})
        .then(async (resp) => {
            if(resp.status !== 201 && resp.status !== 200){
                console.error("Could not create new Scene, are you sure you're logged in?");
                return false;
            }
            return resp.json();
        }).then((json) => {
            id = json._id;
        });

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
    deleteProj
};