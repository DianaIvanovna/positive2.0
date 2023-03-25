/* eslint-disable no-inline-comments */

import {AUTH_POPUP, AUTH_FETCH, REG_FETCH, AUTH_SET, REG_SET, LOGOUT, RESET_AUTH, REG_SUCCESS_POPUP, CHECK_AUTH_FETCH, CHECK_AUTH_SET} from "src/store/types/authTypes";

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

export function regFetch(data) {
    return {
        type: REG_FETCH,
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
export function regSet(data, status) {
    return {
        type: REG_SET,
        status, //pending; fulfilled; rejected;
        payload: data,
    };
}

export function showPopupRegSuccess(data) {
    return {
        type: REG_SUCCESS_POPUP,
        payload: data,
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}

export function checkAuthFetch(data, status) {
    return {
        type: CHECK_AUTH_FETCH,
    };
}

export function checkAuthSet(data, status) {
    return {
        type: CHECK_AUTH_SET,
        status, //pending; fulfilled; rejected;
        payload: data,
    };
}
