/* eslint-disable no-console */
import {fetchFunc} from "./utils";
import {call, put} from "redux-saga/effects";
import {addTours, addTourPage} from "../action/tourAction";

export function* getTours(action) {
    try {
        yield put(addTours(true, "pending"));

        const res = yield call(fetchFunc.bind(null, "/wp-json/pozitiv/v1/tour/get/", action.payload));

        if (res.tours) {
            yield put(addTours(res.tours, "fulfilled"));
        } else {
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
        yield put(addTourPage(true, "pending"));

        const res = yield call(fetchFunc.bind(null, "/wp-json/pozitiv/v1/tour/get/", action.payload));

        if (res.tours) {
            yield put(addTourPage(res.tours[0], "fulfilled"));
        } else {
            yield put(addTourPage(res.error, "rejected"));
        }

        yield put(addTourPage(false, "pending"));
    } catch (e) {
        yield put(addTourPage(e, "rejected"));
        yield put(addTourPage(false, "pending"));
    }
}

export function* tourOrderCreate(action) {
    try {
        // yield put(addTourPage(true, "pending"));

        const res = yield call(fetchFunc.bind(null, "/wp-json/pozitiv/v1/order/create/", action.payload));

        console.log("res", res);
        // if (res.tours) {
        //     yield put(addTourPage(res.tours[0], "fulfilled"));
        // } else {
        //     yield put(addTourPage(res.error, "rejected"));
        // }

        // yield put(addTourPage(false, "pending"));
    } catch (e) {
        // yield put(addTourPage(e, "rejected"));
        // yield put(addTourPage(false, "pending"));
    }
}
