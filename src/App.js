import React, {useEffect} from "react";
import {Routes, Route, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

import {HomePage, MainPage, RentPage, TripPage, BookingPage, Error404Page, UserPage} from "src/pages";
// import {ReconstructionPage} from "src/pages";
import {ErrorBoundary} from "src/components/ErrorBoundary";
import {AuthPopup} from "src/components/AuthPopup/AuthPopup";
import {useSeasonNavigate} from "src/hooks/useSeasonNavigate";
import {useBoundAction} from "src/hooks/useBoundAction";
import {checkAuthFetch} from "src/store/action/authAction";

const App = () => {
    const [auth, loginToAccount] = useSelector(store => [store.auth.auth, store.auth.loginToAccount]);
    const navigate = useSeasonNavigate();
    const popupAuthHandler = useBoundAction(() => checkAuthFetch(false));

    useEffect(() => {
        popupAuthHandler();
    }, []);

    useEffect(() => {
        if (auth && loginToAccount) {
            navigate("account", true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    return (
        <ErrorBoundary>
            <AuthPopup />
            <React.Fragment>
                <Routes>
                    {/* <Route path="*" element={<ReconstructionPage />} /> */}
                    <Route
                        path="/summer"
                        element={
                            <>
                                <Outlet />
                            </>
                        }
                    >
                        <Route index element={<MainPage />} />
                        <Route path="booking/*" element={<BookingPage />} />
                        <Route path="trip" element={<TripPage />} />
                        <Route path="rent" element={<RentPage />} />
                    </Route>
                    <Route
                        path="/winter"
                        element={
                            <>
                                <Outlet />
                            </>
                        }
                    >
                        <Route index element={<MainPage />} />
                        <Route path="booking" element={<BookingPage />} />
                        <Route path="trip" element={<TripPage />} />
                        <Route path="rent" element={<RentPage />} />
                    </Route>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/account" element={<UserPage />} />

                    <Route path="*" element={<Error404Page />} />
                </Routes>
            </React.Fragment>
        </ErrorBoundary>
    );
};

export default App;
