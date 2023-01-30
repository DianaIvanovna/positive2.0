import {combineReducers} from "redux";
import {tourReducer} from "./tourReducer";
import {authReducer} from "./authReducer";
import {userReducer} from "./userReducer";

export default combineReducers({
    tour: tourReducer,
    auth: authReducer,
    user: userReducer,
});
