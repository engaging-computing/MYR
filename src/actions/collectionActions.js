import { collections, scenes } from "../firebase.js";

import * as types from "../constants/ActionTypes";

export function asyncCollections(id) {
    // fetch user's collections
    return (dispatch) => {
        if (id) {
            let userCollections = [];
            collections.where("uid", "==", id).get().then(snap => {
                snap.forEach(doc => {
                    let dat = doc.data();
                    userCollections.push({
                        id: doc.id,
                        collectionID: dat.collectionID,
                        data: dat
                    });
                });
            });
            dispatch(syncCollections(userCollections));
        }
    };
}

export function syncCollections(payload) {
    return { type: types.SYNC_CLASSES, payload: payload };
}

export function asyncCollection(collectionID) {
    // fetch projects in collection
    return (dispatch) => {
        if (collectionID) {
            let collectionProjects = [];
            let projectOptions = [];
            scenes.where("settings.collectionID", "==", collectionID).get().then(snap => {
                snap.forEach(doc => {
                    let dat = doc.data();
                    collectionProjects.push({
                        id: doc.id,
                        name: dat.name,
                        collectionID: dat.collectionID,
                        data: dat
                    });
                });
            }).then(() => {
                collectionProjects.map((proj) =>
                    projectOptions.push({
                        value: proj.id,
                        label: proj.name
                    })
                );
            }).then(() => {
                dispatch(syncCollection(projectOptions));
            });

        }
    };
}

export function syncCollection(payload) {
    return { type: types.SYNC_CLASS, payload: payload };
}

export function deleteCollection(id, name = null) {
    if (window.confirm(`Are you sure you want to delete collection "${name !== null ? name : id}"?`)) {

        // Delete Document
        collections.doc(id).delete()
            .catch((error) => {
                console.error("Error removing collection: ", error);
            });
        return { type: types.DELETE_CLASS, id: id };
    }
}


export default {
    asyncCollection,
    asyncCollections,
    deleteCollection,
    syncCollection,
    syncCollections
};