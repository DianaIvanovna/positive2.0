import {createStore, compose, applyMiddleware} from "redux";
import rootReducer from "./store/reducers/rootReducer";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import {sagaWatcher} from "./store/saga/sagaWatcher";

/* eslint no-underscore-dangle: 0 */
const composeEnhancers = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const saga = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, saga)));

saga.run(sagaWatcher);

export default store;
