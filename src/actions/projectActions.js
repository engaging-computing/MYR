import * as types from "../constants/ActionTypes";
import { scenes, storageRef } from "../firebase.js";

export function asyncUserProj(id) {
    // fetch user's project
    return (dispatch) => {
        if (id) {
            let userVals = [];
            scenes.where("uid", "==", id).get().then(snap => {
                snap.forEach(doc => {
                    storageRef.child(`/images/perspective/${doc.id}`)
                        .getDownloadURL()
                        .catch(() => {
                            console.error("Error: Missing preview image");
                        })
                        .then((img) => {
                            let dat = doc.data();
                            userVals.push({
                                name: dat.name,
                                id: doc.id,
                                data: dat,
                                url: img ? img : "/img/no_preview.jpg"
                            });
                        });
                });
            });
            dispatch(syncUserProj(userVals));
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
                    });
            });
            dispatch(syncExampleProj(exampleVals));
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