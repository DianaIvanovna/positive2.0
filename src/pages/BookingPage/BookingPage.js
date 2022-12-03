/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, {useEffect, useState} from "react";
import "./BookingPage.scss";
import {withRouter} from "react-router";
import {Route, Switch} from "react-router-dom";
import Header from "../../components/Header/Header";
import BookingStep1 from "./modules/BookingStep1/BookingStep1";
import BookingStep2 from "./modules/BookingStep2/BookingStep2";
import BookingStep3 from "./modules/BookingStep3/BookingStep3";
// import photo from "../../../public_html/wp-content/themes/pozitiv/img/background/booking-background.jpg";
import photo2 from "../../../public_html/wp-content/themes/pozitiv/img/background/booking-background-step-3.jpg";

const BookingPage = props => {
    const [tabIndex, setTabIndex] = useState(() => {
        const index = props.location.pathname.slice(-1) === "/" ? props.location.pathname.slice(-2, -1) : props.location.pathname.slice(-1);

        console.log("index", index);

        if (isNaN(index)) {
            return 1;
        }

        return index;
    });

    const changeUrl = index => {
        switch (index) {
            case 0:
                props.history.push("/booking/");

                break;
            case 1:
                props.history.push("/booking/step_2");

                break;
            case 2:
                props.history.push("/booking/step_3");

                break;

            default:
                props.history.push("/booking/");

                break;
        }
    };

    // const [activeTab, setActiveTab] = useState(0);

    // const nextStep = () => {
    //     setActiveTab(val => val + 1);
    // };

    // const tabs = [<BookingStep1 key={0} nextStep={nextStep} />, <BookingStep3 key={1} nextStep={nextStep} />, <BookingStep1 key={2} nextStep={nextStep} />];

    return (
        <div className="main ">
            <Header />
            <div className="main__contant">
                <div className="page" id="tripUp">
                    <div className="pageContent booking-page__background">
                        <div className="booking-page__header">
                            <h2 className="booking-page__title">
                                <div className="booking-page__link-button">
                                    <svg
                                        //(click)="goBack($event)"
                                        className="booking-page__arrow"
                                        alt="стрелка влево"
                                        width="74"
                                        height="72"
                                        viewBox="0 0 74 72"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M50.1224 59.2716C51.1232 58.3071 51.1301 56.7434 50.1156 55.7788L35.1138 41.4848L34.8488 41.2646C33.8348 40.5308 32.3854 40.6075 31.4648 41.4947C30.9661 41.9754 30.7116 42.6074 30.7116 43.2362C30.7116 43.8683 30.9661 44.5036 31.4717 44.9843L46.4735 59.2815L46.7385 59.5017C47.7525 60.2355 49.2019 60.1588 50.1224 59.2716ZM50.3482 15.965C51.1223 14.9969 51.0401 13.6092 50.1227 12.725C49.1184 11.7605 47.4848 11.7572 46.4737 12.7217L23.8851 34.2516L23.6532 34.5038C23.3017 34.943 23.125 35.4702 23.125 35.9996C23.125 36.6284 23.3795 37.2605 23.8782 37.7411C24.8824 38.709 26.516 38.7123 27.5272 37.7477L50.1158 16.2179L50.3482 15.965Z"
                                            fill="#B7B7B7"
                                        />
                                    </svg>
                                </div>
                                Бронирование
                            </h2>

                            <div className={`booking-page__step-container booking-page__step-container--active-${tabIndex}`}>
                                <div className="booking-page__step-content">
                                    <div className="booking-page__step-item">
                                        <div className="booking-page__step booking-page__step--1">Шаг 1</div>
                                        <div className="booking-page__step-name">Выбор даты</div>
                                    </div>
                                    <div className="booking-page__step-item booking-page__step--2">
                                        <div className="booking-page__step">Шаг 2</div>
                                        <div className="booking-page__step-name">Выбор услуг</div>
                                    </div>
                                    <div className="booking-page__step-item booking-page__step--3">
                                        <div className="booking-page__step">Шаг 3</div>
                                        <div className="booking-page__step-name">Оплата</div>
                                    </div>
                                </div>

                                <div className="booking-page__line">
                                    <div className="booking-page__point"></div>
                                </div>
                            </div>
                        </div>

                        <Switch>
                            <Route path="/booking/step_2">
                                <BookingStep2 />
                            </Route>
                            <Route path="/booking/step_3">
                                <BookingStep3 />
                            </Route>
                            <Route path="/booking">
                                <BookingStep1 />
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
