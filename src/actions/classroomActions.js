import { classes, scenes, storageRef } from '../firebase.js';

export const SYNC_CLASSES = 'SYNC_CLASSES';
export const SYNC_CLASS = 'SYNC_CLASS';
export const DELETE_CLASS = 'DELETE_CLASS';

export function asyncClasses(id) {
    // fetch user's classes
    return (dispatch) => {
        if (id) {
            let userClasses = [];
            classes.where('uid', '==', id).get().then(snap => {
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
    return { type: SYNC_CLASSES, payload: payload };
}

export function asyncClass(classroomID) {
    // fetch projects in class
    return (dispatch) => {
        if (classroomID) {
            let classProjects = [];
            scenes.where('classroomID', '==', classroomID).get().then(snap => {
                snap.forEach(doc => {
                    storageRef.child(`/images/perspective/${doc.id}`)
                        .getDownloadURL().then((img) => {
                            let dat = doc.data();
                            classProjects.push({
                                name: dat.name,
                                id: doc.id,
                                data: dat,
                                url: img
                            });
                        });
                });
            });
            dispatch(syncClass(classProjects));
        }
    };
}

export function syncClass(payload) {
    return { type: SYNC_CLASS, payload: payload };
}

export function deleteClass(id, name = null) {
    if (window.confirm(`Are you sure you want to delete class ${name != null ? name : id}?`)) {

        // Delete Document
        classes.doc(id).delete()
            .catch((error) => {
                console.error("Error removing class: ", error);
            });
        return { type: DELETE_CLASS, id: id };
    }
}
