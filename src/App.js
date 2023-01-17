import React from "react";
import {Routes, Route, Outlet} from "react-router-dom";
import {HomePage, MainPage, RentPage, TripPage, BookingPage, Error404Page} from "./pages";
import {ErrorBoundary} from "./components/ErrorBoundary";

const App = () => {
    return (
        <ErrorBoundary>
            <Routes>
                <Route path="/" element={<HomePage />} />
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

                <Route path="*" element={<Error404Page />} />
            </Routes>
        </ErrorBoundary>
    );
};

export default App;
