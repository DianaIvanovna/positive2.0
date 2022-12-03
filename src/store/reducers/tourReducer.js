import {ADD_TOURS, ADD_TOUR_PAGE} from "../types/tourTypes";

const initialState = {
    tours: null,
    tourPage: null,
};

export default function tourReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TOURS:
            return {...state, tours: action.payload};
        case ADD_TOUR_PAGE:
            return {...state, tourPage: action.payload};

        default:
            return state;
    }
}
