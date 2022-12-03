import {takeEvery} from "redux-saga/effects";
import {GET_TOURS, GET_TOUR_PAGE} from "../types/tourTypes";
import {getTours, getTourPage} from "./tourSaga";

export function* sagaWatcher() {
    yield takeEvery(GET_TOURS, getTours);
    yield takeEvery(GET_TOUR_PAGE, getTourPage);
}
