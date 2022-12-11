/* eslint-disable no-inline-comments */
import {ADD_BOOKING_TOUR} from "../types/bookingTypes";

export function addBookingTour(data) {
    return {
        type: ADD_BOOKING_TOUR,
        payload: data,
    };
}
