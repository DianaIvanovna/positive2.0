import {USER_SET_DATA, USER_RESET, USER_GET_ORDERS, USER_SET_ORDERS} from "store/types/userTypes";

export function userSetData(data) {
    return {
        type: USER_SET_DATA,
        payload: data,
    };
}
export function userReset() {
    return {
        type: USER_RESET,
    };
}

export function userGetOrders(data) {
    return {
        type: USER_GET_ORDERS,
        payload: data,
    };
}

export function userSetOrders(data, status) {
    return {
        type: USER_SET_ORDERS,
        status,
        payload: data,
    };
}
