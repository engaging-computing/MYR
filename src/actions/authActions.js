import * as types from "../constants/ActionTypes";

/**
 * @function - Sends a signal to the reducer to login with the given user
 *
 * @param {obj} user - User data from the firebase auth obj
 *
 * @returns - reducer action obj with type: LOGIN and user obj
 */
export function login(user) {
    return { type: types.LOGIN, user };
}

/**
 * @function - Sends a signal to the reducer to logout the current user
 *
 * @returns - reducer action obj with type: LOGOUT
 */
export function logout() {
    return { type: types.LOGOUT };
}

export function refreshToken(token) {
    return { type: types.REFRESH_TOKEN, token };
}

export default {
    login,
    logout,
    refreshToken
};