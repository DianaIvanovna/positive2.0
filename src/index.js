import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import "./styles.scss";
import App from "./App";
import store from "./store";

import {SVGSource} from "src/components/icons";

import {createBrowserHistory} from "history";

const history = createBrowserHistory();

ReactDOM.render(
    // <Provider store={store}>
    <Provider store={store}>
        <SVGSource />
        <React.StrictMode>
            <BrowserRouter history={history}>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);
