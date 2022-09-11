import React from "react";
import {BrowserRouter as Switch, Route} from "react-router-dom";
import {withRouter} from "react-router";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
    return (
        <div className="main">
            <React.Fragment>
                <Switch>
                    <Route path="/" component={HomePage} />
                </Switch>
            </React.Fragment>
        </div>
    );
};

export default withRouter(App);
