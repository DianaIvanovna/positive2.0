import {ADD_TOURS, ADD_TOUR_PAGE} from "../types/tourTypes";
import {tours} from "./data";

const initialState = {
    tours: null,
    tours__loading: false,
    tours__error: null,

    tourPage: tours[0],
};
export default function tourReducer(state = initialState, action) {
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
            return {...state, tourPage: action.payload};

        default:
            return state;
    }
}
