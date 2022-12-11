import {ADD_BOOKING_TOUR} from "../types/bookingTypes";
import {tours} from "./data";

const initialState = {
    bookingTour: tours[0],
};
export default function bookingReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_BOOKING_TOUR:
            return {...state, bookingTour: action.payload};

        default:
            return state;
    }
}
