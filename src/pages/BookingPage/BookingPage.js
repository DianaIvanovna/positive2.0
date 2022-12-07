/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, {useCallback, useEffect, useState} from "react";
import {withRouter, useLocation} from "react-router";
import "./BookingPage.scss";

import {Route, Switch} from "react-router-dom";
import Header from "../../components/Header/Header";
import BookingStep1 from "./modules/BookingStep1/BookingStep1";
import BookingStep2 from "./modules/BookingStep2/BookingStep2";
import BookingStep3 from "./modules/BookingStep3/BookingStep3";
import photo2 from "../../../public_html/wp-content/themes/pozitiv/img/background/booking-background.jpg";
//import photo2 from "../../../public_html/wp-content/themes/pozitiv/img/background/booking-background-step-3.jpg";
import {BookingHeader} from "./modules/BookingHeader/BookingHeader";

const BookingPage = props => {
    const {pathname} = useLocation();
    const [step, setStep] = useState(1);

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
        props.history.push("/booking/step_2");
    }, [props.history]);

    const goToStep3 = useCallback(() => {
        props.history.push("/booking/step_3");
    }, [props.history]);

    const goBack = useCallback(() => {
        props.history.goBack();
    }, [props.history]);

    const [order, setOrder] = useState({
        id: null,
        phoneOwner: null,
        emailOwner: null,
        firstNameOwner: null,
        lastNameOwner: null,
    });

    return (
        <div className="main ">
            <Header />
            <div className="main__contant">
                <div className="page" id="tripUp">
                    <div className="pageContent booking-page__background">
                        <BookingHeader goBack={goBack} step={step} />

                        <Switch>
                            <Route path="/booking/step_2">
                                <BookingStep2 onContinue={goToStep3} />
                            </Route>
                            <Route path="/booking/step_3">
                                <BookingStep3 />
                            </Route>
                            <Route path="/booking">
                                <BookingStep1 onContinue={goToStep2} setOrder={setOrder} order={order} />
                            </Route>
                        </Switch>
                        {/* {tabs[activeTab]} */}

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

export default withRouter(BookingPage);
