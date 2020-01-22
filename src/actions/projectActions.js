import * as types from "../constants/ActionTypes";
import { storageRef } from "../firebase.js";

const sceneRef = "/apiv1/scenes";

export function asyncUserProj(id) {
    // fetch user's project
    return (dispatch) => {
        if (id) {
            fetch(`${sceneRef}/`, {headers: {"x-access-token": id}}).then((response) =>{
                if(response.status === 200){
                    response.json().then((json) =>{
                        for(let i = 0; i < json.length; ++i){
                            let id = json[i].firebaseID ? json[i].firebaseID : json._id;
                            storageRef.child(`/images/perspective/${id}`).getDownloadURL().catch(() =>{
                                console.error("Error: Missing Preview Image");
                            }).then((img) => {
                                json[i].url = img ? img : "/img/no_preview.jpg";
                            });
                        }
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
                    for(let i = 0; i < json.length; ++i){
                        let id = json[i].firebaseID ? json[i].firebaseID : json._id;
                        storageRef.child(`/images/perspective/${id}`).getDownloadURL().catch(() =>{
                            console.error("Error: Missing Preview Image");
                        }).then((img) => {
                            json[i].url = img ? img : "/img/no_preview.jpg";
                        });
                    }
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
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
        // Delete Image
        let path = "images/perspective/" + id;
        let imgRef = storageRef.child(path);

        imgRef.delete().then(() => {
        }).catch((error) => {
            console.error("Error removing img: ", error);
        });

        // Delete Document
        fetch(`${sceneRef}/id/${id}`, {method: "delete", headers: {"x-access-token": uid}}).then((response) => {
            if(response.status !== 204){
                console.error("Error removing document: ", response.status);
            }
            // If deleting current project, redirect to home
            else if (window.location.href === window.origin + "/" + id || window.location.href === window.origin + "/" + id + "/") {
                window.location.href = window.origin;
            }
            return Promise.resolve();
        }).catch((error) => {
            console.error("Error removing document: ", error);
            return Promise.reject();
        });

        return { type: types.DELETE_PROJ, _id: id };
    }
}

/**
 * Saves a scene to MongoDB
 * @param {*} uid The id of the logged in user 
 * @param {*} scene JSON data of the scene to be saved
 * @param {*} sceneID sceneId to be updated, if undefined, creates a new scene
 */
export function save(uid, scene, sceneID=undefined){
    if(sceneID === undefined){
        return fetch(`${sceneRef}/`, {method: "POST", body: JSON.stringify(scene),  headers:{"Content-Type": "application/json", "x-access-token": uid}}).then((resp) => {
            if(resp.status !== 201){
                console.error("Could not create new Scene, are you sure you're logged in?");
                return false;
            }
            return resp.json((json) => { 
                return json;
            });
        });
    }
    else{
        //TODO get PUT working
        return fetch(`${sceneRef}/id/${sceneID}`, {method: "PUT", body: JSON.stringify(scene), headers: {"x-access-token": uid, "Content-Type": "application/json"}}).then((resp) =>{
            if(resp.status !== 200){
                console.error(`Could not update this scene: ${resp.status}`);
                return false;
            }
            return resp.json((json) =>{
                return json;
            });
        });
    }
}

export default {
    asyncUserProj,
    syncUserProj,
    asyncExampleProj,
    syncExampleProj,
    deleteProj
};