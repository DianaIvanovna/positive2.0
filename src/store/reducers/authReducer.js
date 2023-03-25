import {AUTH_POPUP, RESET_AUTH, AUTH_SET, REG_SET, REG_SUCCESS_POPUP, CHECK_AUTH_SET} from "src/store/types/authTypes.js";

const initialState = {
    authPopup: false,
    auth: false,
    loginToAccount: false,
    auth__loading: false,
    auth__error: null,
    reg__loading: false,
    reg__error: null,
    reg_success_popup: false,
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

        case REG_SET:
            if (action.status === "pending") {
                return {...state, reg__loading: action.payload};
            }

            if (action.status === "rejected") {
                return {...state, reg__error: action.payload, loginToAccount: false};
            }

            return {...state, reg_success_popup: true, loginToAccount: true};
        case CHECK_AUTH_SET:
            if (action.status === "pending") {
                return {...state, check_auth__loading: action.payload};
            }

            if (action.status === "rejected") {
                return {...state, check_auth__error: action.payload};
            }

            return {...state, check_auth: true};
        case REG_SUCCESS_POPUP:
            return {...state, reg_success_popup: false};
        default:
            return state;
    }
}
