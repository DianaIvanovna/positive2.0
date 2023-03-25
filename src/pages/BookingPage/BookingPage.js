/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, {useCallback, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import "./BookingPage.scss";

import {Route, Routes, NavLink} from "react-router-dom";
import Header from "../../components/Header/Header";
import BookingStep1 from "./modules/BookingStep1/BookingStep1";
import BookingStep2 from "./modules/BookingStep2/BookingStep2";
import BookingStep3 from "./modules/BookingStep3/BookingStep3";
import photo2 from "../../../public_html/wp-content/themes/pozitiv/img/background/booking-background.jpg";
//import photo2 from "../../../public_html/wp-content/themes/pozitiv/img/background/booking-background-step-3.jpg";
import {BookingHeader} from "./modules/BookingHeader/BookingHeader";
import {useDispatch, useSelector} from "react-redux";
import {useSeasonNavigate} from "../../hooks/useSeasonNavigate";
import {getTourPage, orderCreate} from "../../store/action/tourAction";
import {Loading} from "../../components/Loading/Loading";

const defoltOrder = {
    trip: {
        id: null,
        cost: null,
    },
    phoneOwner: null,
    emailOwner: null,
    firstNameOwner: "",
    lastNameOwner: "",
    data: null,
};

export const BookingPage = () => {
    const dispath = useDispatch();
    const navigate = useNavigate();
    const navigateSeason = useSeasonNavigate();
    const {pathname} = useLocation();
    const [step, setStep] = useState(1);
    const [bookingTour, tourPage__loading, tourPage__error] = useSelector(store => [store.tour.tourPage, store.tour.tourPage__loading, store.tour.tourPage__error]);

    useEffect(() => {
        if (!bookingTour && !tourPage__loading) {
            const id = localStorage.getItem("idBookedTrip");

            if (id) {
                const formData = new FormData();

                formData.append("id", id);
                console.log("!");
                dispath(getTourPage(formData));
            } else {
                navigateSeason("/");
            }
        }
    }, [bookingTour, tourPage__loading, dispath, navigateSeason]);

    useEffect(() => {
        if (pathname.includes("step_2")) {
            setStep(2);

            return;
        }

        if (pathname.includes("step_3")) {
            setStep(3);

            return;
        }

        setStep(1);
    }, [pathname]);

    const goToStep2 = useCallback(() => {
        navigateSeason("booking/step_2");
    }, [navigateSeason]);

    const goToStep3 = useCallback(() => {
        navigateSeason("booking/step_3");
    }, [navigateSeason]);

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const [order, setOrder] = useState(() => {
        const localOrder = JSON.parse(localStorage.getItem("order"));

        if (localOrder) {
            return localOrder;
        }

        return defoltOrder;
    });

    const orderCreateHandler = () => {
        const formData = new FormData();

        console.log("bookingTour", bookingTour);
        console.log("order", order);

        formData.append("tourID", bookingTour.id);
        formData.append("tripID", order.trip.id);
        formData.append("phoneOwner", order.phoneOwner);
        formData.append("emailOwner", order.emailOwner);
        formData.append("firstNameOwner", order.firstNameOwner);
        formData.append("lastNameOwner", order.lastNameOwner);
        formData.append("data", JSON.stringify(order.data));
        dispath(orderCreate(formData));
        localStorage.removeItem("order");
        localStorage.removeItem("idBookedTrip");
    };

    useEffect(() => {
        localStorage.setItem("order", JSON.stringify(order));
    }, [order]);

    if (tourPage__loading) {
        return (
            <div className="main ">
                <Header />
                <div className="main__contant">
                    <Loading />
                </div>
            </div>
        );
    }

    if (tourPage__error) {
        return (
            <div className="main ">
                <Header />
                <div className="main__contant">
                    <p className="booking-page__error">Что-то пошло не так... Попробуйте снова</p>
                    <NavLink className="booking-page__error " to={`/`}>
                        Вернуться на главную страницу
                    </NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className="main ">
            <Header />
            <div className="main__contant">
                <div className="page" id="tripUp">
                    <div className="pageContent booking-page__background">
                        <BookingHeader goBack={goBack} step={step} />

                        <Routes>
                            <Route index element={<BookingStep1 onContinue={goToStep2} setOrder={setOrder} order={order} bookingTour={bookingTour} />} />
                            <Route path="/step_2" element={<BookingStep2 onContinue={goToStep3} setOrder={setOrder} order={order} />} />
                            <Route path="/step_3" element={<BookingStep3 orderCreate={orderCreateHandler} bookingTour={bookingTour} order={order} />} />
                        </Routes>

                        <picture className={`page__background_footer page__background_footer--center lazy-image`}>
                            <source media="(min-width: 1600px)" data-srcset={photo2} type="image/webp" />
                            {/* <source media="(min-width: 1040px)" data-srcset={dataFooter.photos[1]} type="image/webp" />
                            <source media="(min-width: 600px)" data-srcset={dataFooter.photos[2]} type="image/webp" />
                            <source data-srcset={dataFooter.photos[3]} type="image/webp" /> */}
                            <img width="1980px" height="1080px" src={photo2} data-srcset={photo2} srcSet={photo2} alt="фон" />
                        </picture>
                    </div>
                </div>
            </div>
        </div>
    );
};
