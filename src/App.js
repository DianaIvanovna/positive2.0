import React from "react";
// eslint-disable-next-line no-unused-vars
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {withRouter} from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import MainPage from "./pages/MainPage/MainPage";
import RentPage from "./pages/RentPage/RentPage";

const App = () => {
    return (
        // <div className="main">

        // </div>
        <React.Fragment>
            <Switch>
                <Route path="/trips" component={MainPage} />
                <Route path="/rent" component={RentPage} />
                <Route path="*" component={HomePage} />
            </Switch>
        </React.Fragment>
    );
};

export default withRouter(App);
