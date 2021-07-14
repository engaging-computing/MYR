import * as types from "../constants/ActionTypes";

export const collectRef = "/apiv1/collections";


/**
 * Fetch the list of the user collection asynchronously
 *  Use when user login or added a new collection
 *  
 * @param {*} uid A JWT token to authenticate with the backend
 */
export function asyncCollections(uid) {
    // fetch user's collections
    return (dispatch) => {
        if (uid) {
            let userCollections = [];
            fetch(collectRef, {headers: {"x-access-token": uid}}).then((data) => {
                data.json().then((data) => {
                    data.forEach((doc) => {
                        userCollections.push(doc);
                    });
                });
                dispatch(syncCollections(userCollections));
            });
        }
    };
}

/**
 * Sends a signal to the reducer to sync the user collections
 * 
 * @param {object} payload List of user collections
 *  
 * @returns {object} reducer action obj with type SYNC_CLASSES with payload
 */
export function syncCollections(payload) {
    return { type: types.SYNC_CLASSES, payload: payload };
}

/**
 * Fetch the specific collection specify by user
 * 
 * @param {string} collectionID Collection id 
 * @param {*} uid A JWT token to authenticate with the backend
 */
export function asyncCollection(collectionID, uid) {
    // fetch projects in collection
    return (dispatch) => {
        if (collectionID) {
            let collectionProjects = [];
            let projectOptions = [];
            fetch(`${collectRef}/collectionID/${collectionID}`, {headers: {"x-access-token": uid}})
                .then((resp) => {
                    switch(resp.status){
                        case 200:
                            document.title = collectionID + " Collection | MYR";
                            resp.json().then((data) => {
                                data.forEach((doc) => {
                                    collectionProjects.push(doc);
                                });
                                collectionProjects.map((proj) => {
                                    return projectOptions.push({
                                        value: proj._id,
                                        label: proj.name
                                    });
                                });
        
                                dispatch(syncCollection(projectOptions));
                            });
                            break;
                        case 401:
                            window.alert("Error: You are not logged in as the owner of this collection");
                            break;
                        case 404:
                            window.location.assign("/error-404");
                            break;
                        default:
                            window.alert(`Error fetching collection scenes: ${resp.statusText}`);
                    }
                });
        }
    };
}

/**
 * Sends a signal to the reducer to load the retrieved collection
 * 
 * @param {object} payload Data of retrieved collection 
 * 
 * @returns {object} reducer action obj with type: SYNC_CLASS and payload
 */
export function syncCollection(payload) {
    return { type: types.SYNC_CLASS, payload: payload };
}

/**
 * Sends a signal to the reducer to delete the specific collection of user
 * 
 * @param {string} collectionID Collection ID
 * @param {string} name Name of the collection if exists 
 * @param {*} uid A JWT token to authenticate with the backend
 */
export function deleteCollection(collectionID, name = null, uid) {
    return (dispatch) => {
        name = (name ? name : collectionID);
        if (window.confirm(`Are you sure you want to delete collection "${name}"?`)) {

            // Delete Document
            fetch(`${collectRef}/collectionID/${name}`, {method: "DELETE", headers: { "x-access-token": uid}}).then((resp) => {
                if(resp.status !== 204) {
                    console.error(`Error deleting collection ${name}: ${resp.statusText}`);
                    return;
                }
                dispatch({ type: types.DELETE_CLASS, id: collectionID });
            });
        }
    };
}

/**
 * Creates a new collection
 * 
 * @param {string} name The name of the collection to be created
 * @param {*} uid A JWT token to authenticate with the backend
 */
export async function createCollection(name, uid) {
    name = name.toLowerCase().trim();
    
    let resp = await fetch(`${collectRef}/`, {
        method: "POST", 
        body: JSON.stringify({collectID: name}),
        headers:{"Content-Type": "application/json", "x-access-token": uid}
    });
    if(resp.status === 409){
        window.alert("Error: A collection already exists with that collection name.");
        return false;
    }else if (resp.status !== 201) {
        window.alert(`Error creating collection: ${resp.statusText}`);
        return false;
    }else{
        asyncCollections(uid);
        window.alert("Collection added!");
        return true;
    }
}


export default {
    asyncCollection,
    asyncCollections,
    deleteCollection,
    syncCollection,
    syncCollections,
    createCollection,
    collectRef
};