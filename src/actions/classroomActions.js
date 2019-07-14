import { classes, scenes } from "../firebase.js";

import * as types from "../constants/ActionTypes";

export function asyncClasses(id) {
    // fetch user's classes
    return (dispatch) => {
        if (id) {
            let userClasses = [];
            classes.where("uid", "==", id).get().then(snap => {
                snap.forEach(doc => {
                    let dat = doc.data();
                    userClasses.push({
                        id: doc.id,
                        classroomID: dat.classroomID,
                        data: dat
                    });
                });
            });
            dispatch(syncClasses(userClasses));
        }
    };
}

export function syncClasses(payload) {
    return { type: types.SYNC_CLASSES, payload: payload };
}

export function asyncClass(classroomID) {
    // fetch projects in class
    return (dispatch) => {
        if (classroomID) {
            let classProjects = [];
            let projectOptions = [];
            scenes.where("settings.classroomID", "==", classroomID).get().then(snap => {
                snap.forEach(doc => {
                    let dat = doc.data();
                    classProjects.push({
                        id: doc.id,
                        name: dat.name,
                        classroomID: dat.classroomID,
                        data: dat
                    });
                });
            }).then(() => {
                classProjects.map((proj) =>
                    projectOptions.push({
                        value: proj.id,
                        label: proj.name
                    })
                );
            }).then(() => {
                dispatch(syncClass(projectOptions));
            });

        }
    };
}

export function syncClass(payload) {
    return { type: types.SYNC_CLASS, payload: payload };
}

export function deleteClass(id, name = null) {
    if (window.confirm(`Are you sure you want to delete class "${name !== null ? name : id}"?`)) {

        // Delete Document
        classes.doc(id).delete()
            .catch((error) => {
                console.error("Error removing class: ", error);
            });
        return { type: types.DELETE_CLASS, id: id };
    }
}


export default {
    asyncClass,
    asyncClasses,
    deleteClass,
    syncClass,
    syncClasses
};