import * as types from "../constants/ActionTypes";
import { scenes, storageRef } from "../firebase.js";

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
        let exampleVals = [];
        scenes.where("uid", "==", "1").get().then(snap => {
            let num_proj_loaded = 0;
            snap.forEach(doc => {
                storageRef.child(`/images/perspective/${doc.id}`)
                    .getDownloadURL()
                    .catch(() => {
                        console.error("Error: Missing preview image");
                    })
                    .then((img) => {
                        let dat = doc.data();
                        exampleVals.push({
                            name: dat.name,
                            id: doc.id,
                            data: dat,
                            url: img ? img : "/img/no_preview.jpg"
                        });
                        num_proj_loaded++;
                        if(num_proj_loaded === snap.size){
                            dispatch(syncExampleProj(exampleVals));
                        }
                    });   
            });
        });
    };
};

export function syncExampleProj(payload) {
    return { type: types.SYNC_EXAMP_PROJ, payload: payload };
}

export function deleteProj(id, name) {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
        // Delete Image
        let path = "images/perspective/" + id;
        let imgRef = storageRef.child(path);

        imgRef.delete().then(() => {
        }).catch((error) => {
            console.error("Error removing img: ", error);
        });

        // Delete Document
        scenes.doc(id).delete().then(() => {

            // If deleting current project, redirect to home
            if (window.location.href === window.origin + "/" + id || window.location.href === window.origin + "/" + id + "/") {
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