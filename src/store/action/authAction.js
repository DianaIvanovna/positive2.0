/* eslint-disable no-inline-comments */
// eslint-disable-next-line no-unused-vars
import {AUTH_POPUP, AUTH_FETCH, REG_FETCH, AUTH_SET, REG_SET, LOGOUT, RESET_AUTH} from "src/store/types/authTypes";

export function authPopupAction(data) {
    return {
        type: AUTH_POPUP,
        payload: data,
    };
}

export function resetAuthPopup(data) {
    return {
        type: RESET_AUTH,
        payload: data,
    };
}

export function authFetch(data) {
    return {
        type: AUTH_FETCH,
        payload: data,
    };
}

export function authSet(data, status) {
    return {
        type: AUTH_SET,
        status, //pending; fulfilled; rejected;
        payload: data,
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}
