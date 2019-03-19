import { classes, scenes } from '../firebase.js';

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
            let projectOptions = [];
            scenes.where('settings.classroomID', '==', classroomID).get().then(snap => {
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
            });
            dispatch(syncClass(projectOptions));
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
