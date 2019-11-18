import * as types from "../constants/ActionTypes";
import { storageRef } from "../firebase.js";

const sceneRef = "/apiv1/scenes";

export function asyncUserProj(id) {
    // fetch user's project
    return (dispatch) => {
        if (id) {
            //let userVals = [];
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
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        return { type: types.DELETE_PROJ, id: id };
    }
}

export default {
    asyncUserProj,
    syncUserProj,
    asyncExampleProj,
    syncExampleProj,
    deleteProj
};