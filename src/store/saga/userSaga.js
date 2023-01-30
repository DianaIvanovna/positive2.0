/* eslint-disable no-console */
import {fetchFunc} from "./utils";
import {call, put} from "redux-saga/effects";
import {userSetOrders} from "src/store/action/userAction";

export function* userGetOrdersSaga(action) {
    try {
        yield put(userSetOrders(true, "pending"));

        const res = yield call(fetchFunc.bind(null, "/wp-json/pozitiv/v1/order/getmy/", action.payload));

        if (res.result === 0) {
            yield put(userSetOrders(res.message, "rejected"));
        } else {
            yield put(userSetOrders(res.orders, "fulfilled"));
        }
    } catch (e) {
        yield put(userSetOrders(e, "rejected"));
    }
}
