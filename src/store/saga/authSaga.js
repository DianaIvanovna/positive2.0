/* eslint-disable no-console */
import {fetchFunc} from "./utils";
import {call, put} from "redux-saga/effects";
import {authSet, authPopupAction, resetAuthPopup} from "src/store/action/authAction";
import {userSetData, userReset} from "src/store/action/userAction";
import {resetTourReducer} from "src/store/action/tourAction";

export function* authFetchSaga(action) {
    try {
        yield put(authSet(true, "pending"));

        const res = yield call(fetchFunc.bind(null, "/wp-json/pozitiv/v1/user/login/", action.payload));

        if (res.result === 0) {
            yield put(authSet(res.message, "rejected"));
        } else {
            yield put(authPopupAction(false));
            yield put(authSet(null, "fulfilled"));
            yield put(userSetData(res.user.data));
        }

        yield put(authSet(false, "pending"));
    } catch (e) {
        yield put(authSet(e, "rejected"));
        yield put(authSet(false, "pending"));
    }
}

export function* authLogout(action) {
    try {
        const res = yield call(fetchFunc.bind(null, "/wp-json/pozitiv/v1/user/logout/", action.payload));

        if (res.result === 1) {
            yield put(resetAuthPopup());
            yield put(resetTourReducer());
            yield put(userReset());
        }
    } catch (e) {
        console.log("e", e);
    }
}
