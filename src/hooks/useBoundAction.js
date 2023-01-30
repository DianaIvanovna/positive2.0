import {useCallback} from "react";
import {useDispatch} from "react-redux";

/**
 * Wrap actionCreator to dispatch
 */
export const useBoundAction = (
    // eslint-disable-next-line
    actionCreator
) => {
    const dispatch = useDispatch();

    // eslint-disable-next-line no-undef
    return useCallback((...arg) => dispatch(actionCreator(...arg)), [dispatch, actionCreator]);
};
