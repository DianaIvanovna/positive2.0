/* eslint-disable no-inline-comments */
import {GET_TOURS, ADD_TOURS, GET_TOUR_PAGE, ADD_TOUR_PAGE} from "../types/tourTypes";

export function getTours(data) {
    return {
        type: GET_TOURS,
        payload: data,
    };
}

export function addTours(data, status) {
    return {
        type: ADD_TOURS,
        status, //pending; fulfilled; rejected;
        payload: data,
    };
}

export function getTourPage(data) {
    return {
        type: GET_TOUR_PAGE,
        payload: data,
    };
}

export function addTourPage(data, status) {
    return {
        type: ADD_TOUR_PAGE,
        status,
        payload: data,
    };
}
