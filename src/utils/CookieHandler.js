/**
 * @param {*} cookieName name of the cookie being fetched
 * @returns {string} value of the cookie, empty string if it doesn't exist
 */
const getCookie = (cookieName) => {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

/**
 * @param {*} cookieName name of cookie being set
 */
const setCookie = (cookieName) => {
    if (!getCookie(cookieName)) {
        let date = new Date();
        date.setTime(date.getTime() + (1000 * 60 * 60 * 24));
        let expiration = "; expires=" + date.toGMTString();
        let cookie = cookieName + "=true" + expiration;
        document.cookie = cookie;
    }
};

/**
 * @param {*} cookieName name of cookie being set to never again
 */
const neverAgainCookie = (cookieName) => {
    document.cookie = cookieName + "=true; expires=Thu, 31 Dec 2099 12:00:00 UTC;";
};

export default {
    getCookie,
    setCookie,
    neverAgainCookie
};