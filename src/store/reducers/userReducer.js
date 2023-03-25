import {USER_SET_DATA, USER_RESET, USER_SET_ORDERS} from "src/store/types/userTypes";

const initialState = {
    //user: null,
    user: {
        ID: "3",
        user_login: "nosend2_nosend_ru",
        user_pass: "$P$B22PsELIIhtJXNEKgMriXcWj9e6oHr0",
        user_nicename: "nosend2_nosend_ru",
        user_email: "nosend2@nosend.ru",
        user_url: "",
        user_registered: "2022-10-03 19:39:33",
        user_activation_key: "",
        user_status: "0",
        display_name: "nosend2_nosend_ru",
    },
    orders__loading: false,
    orders__error: false,
    orders: [
        {
            data: [{email: "GDI.1999@yandex.ru", phone: "+79992014525", firstName: "Диана Ивановна Гарбуз"}],
            dateCreate: "2023-01-31 17:45:54",
            emailOwner: "GDI.1999@yandex.ru",
            firstNameOwner: "Диана Ивановна Гарбуз",
            id: "14",
            idUserOwner: "6",
            lastNameOwner: "",
            messageAdmin: "",
            messageClient: "",
            phoneOwner: "+79992014525",
            status: "created",
            tourID: "50",
            tripID: "67",
        },
    ],
};
export function userReducer(state = initialState, action) {
    switch (action.type) {
        case USER_SET_DATA:
            return {...state, user: action.payload};

        case USER_SET_ORDERS:
            if (action.status === "pending") {
                return {...state, orders__loading: action.payload};
            }

            if (action.status === "rejected") {
                return {...state, orders__error: action.payload, orders__loading: false};
            }

            return {...state, orders: action.payload, orders__loading: false};

        case USER_RESET:
            return {...initialState};

        default:
            return state;
    }
}
