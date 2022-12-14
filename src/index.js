import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
// import {Provider} from "react-redux";
import App from "./App";
// import "./index.scss";
// import store from "./store";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

ReactDOM.render(
    // <Provider store={store}>
    <React.StrictMode>
        <React.StrictMode>
            <Router history={history}>
                <App />
            </Router>
        </React.StrictMode>
    </React.StrictMode>,
    document.getElementById("root")
);
