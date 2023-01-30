import {AUTH_POPUP, RESET_AUTH, AUTH_SET} from "src/store/types/authTypes.js";

const initialState = {
    authPopup: false,
    auth: false,
    loginToAccount: false,
    auth__loading: false,
    auth__error: null,
    user: null,
};
export function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_POPUP:
            return {...state, authPopup: action.payload};
        case RESET_AUTH:
            return {...initialState};

        case AUTH_SET:
            if (action.status === "pending") {
                return {...state, auth__loading: action.payload};
            }

            if (action.status === "rejected") {
                return {...state, auth__error: action.payload, loginToAccount: false};
            }

            return {...state, auth: true, loginToAccount: true};

        default:
            return state;
    }
}
