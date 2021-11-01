import * as types from "../constants/ActionTypes";

const googleLoginRef = "apiv1/googlelogins";

export function toggleDarkMode(){
    return { type: types.TOGGLE_DARK_MODE };
}

export function asyncUserSettings(id){
    return dispatch => {
        if(id){
            fetch(`${googleLoginRef}/settings`,{headers:{"x-access-token": id}}).then(response=>{
                console.log(response);
                if(response.status === 200){
                    response.json().then(json =>{
                        dispatch(syncUserSettings(json));
                    });
                }
            });
        }
    };
}

export function syncUserSettings(settings){
    return { type: types.SYNC_USER_SETTINGS, settings: settings };
}

export default {
    toggleDarkMode,
    asyncUserSettings,
    syncUserSettings
};