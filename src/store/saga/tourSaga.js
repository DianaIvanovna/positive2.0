/* eslint-disable no-console */
import {fetchFunc} from "./utils";
import {call, put} from "redux-saga/effects";
import {addTours, addTourPage} from "../action/tourAction";

export function* getTours(action) {
    try {
        const res = yield call(fetchFunc.bind(null, "/wp-json/pozitiv/v1/tour/get/", action.payload));

        if (res?.[0].trips) {
            yield console.log("getTours1", res[0].trips);
            yield put(addTours(res[0].trips));
        } else {
            yield console.log("getTours2", res.error);
        }
    } catch (e) {
        yield console.log("getTours error", e);
    }
}

export function* getTourPage(action) {
    try {
        const res = yield call(fetchFunc.bind(null, "/wp-json/pozitiv/v1/tour/get/", action.payload));

        if (res?.number === 0) {
            yield console.log("getTours2", res.error);
        } else {
            yield console.log("getTours1", res[0]);
            yield put(addTourPage(res[0]));
        }
    } catch (e) {
        yield console.log("getTours error", e);
    }
}
