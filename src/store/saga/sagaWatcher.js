import {takeEvery} from "redux-saga/effects";
import {GET_TOURS, GET_TOUR_PAGE, ORDER_CREATE} from "src/store/types/tourTypes";
import {AUTH_FETCH, LOGOUT} from "src/store/types/authTypes";
import {USER_GET_ORDERS} from "src/store/types/userTypes";

import {getTours, getTourPage, tourOrderCreate} from "src/store/saga/tourSaga";
import {authFetchSaga, authLogout} from "src/store/saga/authSaga";
import {userGetOrdersSaga} from "src/store/saga/userSaga";

export function* sagaWatcher() {
    //tours
    yield takeEvery(GET_TOURS, getTours);
    yield takeEvery(GET_TOUR_PAGE, getTourPage);
    yield takeEvery(ORDER_CREATE, tourOrderCreate);
    //auth
    yield takeEvery(AUTH_FETCH, authFetchSaga);
    yield takeEvery(LOGOUT, authLogout);

    //user
    yield takeEvery(USER_GET_ORDERS, userGetOrdersSaga);
}
