import {ADD_TOURS, ADD_TOUR_PAGE, RESET_TOUR} from "../types/tourTypes";
//import {tours} from "./data";

const initialState = {
    tours: null,
    tours__loading: false,
    tours__error: null,
    tourPage: null,
    tourPage__loading: false,
    tourPage__error: null,
};
export function tourReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TOURS:
            if (action.status === "pending") {
                return {...state, tours__loading: action.payload};
            }

            if (action.status === "rejected") {
                return {...state, tours__error: action.payload};
            }

            return {...state, tours: action.payload};
        case ADD_TOUR_PAGE:
            if (action.status === "pending") {
                return {...state, tourPage__loading: action.payload};
            }

            if (action.status === "rejected") {
                return {...state, tourPage__error: action.payload};
            }

            return {...state, tourPage: action.payload};
        case RESET_TOUR:
            return {...initialState};
        default:
            return state;
    }
}
