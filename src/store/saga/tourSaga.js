/* eslint-disable no-console */
import {fetchFunc} from "./utils";
import {call, put} from "redux-saga/effects";
import {addTours, addTourPage} from "../action/tourAction";

export function* getTours(action) {
    try {
        yield put(addTours(true, "pending"));

        const res = yield call(fetchFunc.bind(null, "/wp-json/pozitiv/v1/tour/get/", action.payload));

        yield console.log("getTours", res);

        if (res.tours) {
            yield put(addTours(res.tours, "fulfilled"));
        } else {
            yield console.log("getTours2", res.error);
            yield put(addTours(res.error, "rejected"));
        }

        yield put(addTours(false, "pending"));
    } catch (e) {
        yield put(addTours(e, "rejected"));
        yield put(addTours(false, "pending"));
    }
}

export function* getTourPage(action) {
    try {
        const res = yield call(fetchFunc.bind(null, "/wp-json/pozitiv/v1/tour/get/", action.payload));

        yield console.log("getTourPage", res);

        if (res.tours) {
            yield console.log("getTours1", res[0]);
            yield put(addTourPage(res.tours[0]));
        } else {
            yield console.log("getTours2", res.error);
        }
    } catch (e) {
        yield console.log("getTours error", e);
    }
}
