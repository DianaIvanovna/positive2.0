import {combineReducers} from "redux";
import tourReducer from "./tourReducer";
import bookingReducer from "./bookingReducer";

export default combineReducers({
    tour: tourReducer,
    booking: bookingReducer,
});
