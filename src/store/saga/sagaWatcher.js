import {takeEvery} from "redux-saga/effects";
import {GET_TOURS, GET_TOUR_PAGE, ORDER_CREATE} from "../types/tourTypes";
import {getTours, getTourPage, tourOrderCreate} from "./tourSaga";

export function* sagaWatcher() {
    yield takeEvery(GET_TOURS, getTours);
    yield takeEvery(GET_TOUR_PAGE, getTourPage);
    yield takeEvery(ORDER_CREATE, tourOrderCreate);
}
