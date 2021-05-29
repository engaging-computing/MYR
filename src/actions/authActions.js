import * as types from "../constants/ActionTypes";

/**
 * Sends a signal to the reducer to login with the given user
 *
 * @param {obj} user User data from the firebase auth obj
 *
 * @returns {object} reducer action obj with type: LOGIN and user obj
 */
export function login(user) {
    return { type: types.LOGIN, user };
}

/**
 * Sends a signal to the reducer to logout the current user
 *
 * @returns {object} reducer action obj with type: LOGOUT
 */
export function logout() {
    return { type: types.LOGOUT };
}

/**
 * Sends a signal to the reducer to refresh the token
 * 
 * @param {object} token 
 * 
 * @returns {object} reducer action object with type: REFRESH_TOKEN and token obj
 */
export function refreshToken(token) {
    return { type: types.REFRESH_TOKEN, token };
}

export default {
    login,
    logout,
    refreshToken
};