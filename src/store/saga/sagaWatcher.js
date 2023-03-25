import {takeEvery} from "redux-saga/effects";
import {GET_TOURS, GET_TOUR_PAGE, ORDER_CREATE} from "src/store/types/tourTypes";
import {AUTH_FETCH, REG_FETCH, LOGOUT, CHECK_AUTH_FETCH} from "src/store/types/authTypes";
import {USER_GET_ORDERS} from "src/store/types/userTypes";

import {getTours, getTourPage, tourOrderCreate} from "src/store/saga/tourSaga";
import {authFetchSaga, regFetchSaga, authLogout, authCheck} from "src/store/saga/authSaga";
import {userGetOrdersSaga} from "src/store/saga/userSaga";

export function* sagaWatcher() {
    //tours
    yield takeEvery(GET_TOURS, getTours);
    yield takeEvery(GET_TOUR_PAGE, getTourPage);
    yield takeEvery(ORDER_CREATE, tourOrderCreate);
    //auth
    yield takeEvery(AUTH_FETCH, authFetchSaga);
    yield takeEvery(REG_FETCH, regFetchSaga);
    yield takeEvery(LOGOUT, authLogout);
    yield takeEvery(CHECK_AUTH_FETCH, authCheck);

    //user
    yield takeEvery(USER_GET_ORDERS, userGetOrdersSaga);
}
