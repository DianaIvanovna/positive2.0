/* eslint-disable max-len */
import React, {useEffect, useRef, useState} from "react";
import {withRouter} from "react-router";
import "./TripPage.scss";
import Header from "../../components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {getTourPage} from "../../store/action/tourAction";
import GoUp from "../../components/GoUp/GoUp";

import logoWebp from "../../../public_html/wp-content/themes/pozitiv/img/logo/logo-big_a1b.webp";
import logoPng from "../../../public_html/wp-content/themes/pozitiv/img/logo/logo-big.png";
import icon1 from "../../../public_html/wp-content/themes/pozitiv/img/Icon/Calendar_for_trip.svg";
import icon2 from "../../../public_html/wp-content/themes/pozitiv/img/Icon/Time Circle.svg";
import icon3 from "../../../public_html/wp-content/themes/pozitiv/img/Icon/Discovery_for_trip.svg";
import {dataFooterWinter, dataFooterSummer} from "./data";

import photo from "../../../../photo.png";
import Footer from "../../components/Footer/Footer";
import {useOnScreen} from "../../utils/useOnScreen";

const data = {
    photos: [photo, photo, photo, photo, photo],
    date: "05.05.05",
    time: "12:00",
    place: "la la la place",
    price: "1000",
    travelPlan: `День 1
    6:00 - сбор, ул. Братьев Кашириных 75, магазин Лента
    6:30 - отправление из Челябинска.
    10:00 - приезд на поляну в п. Ваняшкино, начало сплава.
    15:00 - прибытие на оборудованный кемпинг "Барсучий лог", обед, экскурсия на обзорную площадку, отдых.
    20:00 - ужин, свободное время, посиделки у костра, МЕГА-ТУСИЧ по случаю ЗАКРЫТИЯ СЕЗОНА.
    00:46 - отбой, ночевка в палатках.`,
    imgForTravelPlan: photo,
};

const TripPage = props => {
    const dispath = useDispatch();
    const [tripPageData] = useSelector(store => [store.tour.tourPage]);

    const [season, setSeason] = useState(null);
    const [dataFooter, setDataFooter] = useState(null);

    const lazyImage = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const isOnScreen = useOnScreen([lazyImage], [dataFooter, tripPageData]);

    // eslint-disable-next-line no-console
    console.log("tripPageData", tripPageData);

    useEffect(() => {
        const formData = new FormData();

        formData.append("ID", 26);
        dispath(getTourPage(formData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        //props.location.pathname
        const query = new URLSearchParams(props.location.search);
        const season = query.get("season");

        setSeason(season);

        if (season === "summer") {
            // setDataWelcomeSection(dataTripSummer);
            setDataFooter(dataFooterSummer);
            // setPositiveIs(dataPositiveIsSummer);
        } else {
            // setDataWelcomeSection(dataTripWinter);
            setDataFooter(dataFooterWinter);
            // setPositiveIs(dataPositiveIsWinter);
        }
    }, [props.location]);

    if (!tripPageData || !dataFooter) {
        return (
            <div className="main">
                <Header season={season} />
                <div className="main__contant">
                    <div className="loading loading_trip-info">
                        <picture className="loading__pulse">
                            <source srcSet={logoWebp} type="image/webp" />
                            <img width="106px" height="106px" src={logoPng} alt="логтип positive" />
                        </picture>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="main">
            <Header season={season} />
            <div className="main__contant">
                {/* <!-- content start --> */}
                <div className="page" id="tripUp">
                    <div className="pageContent">
                        <section className="trip-info">
                            <div className="trip-info__header">
                                <p className="trip-info__link-button">
                                    <svg
                                        //(click)="goBack($event)"
                                        className="trip-info__arrow"
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
                                </p>
                                <h2 className="trip-info__title">{tripPageData.name}</h2>
                            </div>

                            <div className="trip-info__container">
                                <div className="img-container">
                                    <div className="trip-info__img-background">
                                        <img
                                            width="453px"
                                            height="434px"
                                            // src={tripPageData.images}
                                            src={data.photos[0]}
                                            alt="фото поездки"
                                            className="trip-info__img"
                                        />
                                    </div>
                                    {data.photos.map((item, index) => (
                                        <img
                                            width="80px"
                                            height="80px"
                                            //*ngFor="let item of trip.photos; let i = index" (click)="changeActivePhoto(i)"
                                            // [class.trip-info__img-small_active] ="i===numberActivePhoto"
                                            src={item}
                                            key={index}
                                            alt="фото поездки"
                                            className="trip-info__img-small"
                                        />
                                    ))}
                                </div>

                                <div className="trip-info__discription">
                                    <p className="trip-info__text" dangerouslySetInnerHTML={{__html: tripPageData.description}}></p>

                                    <ul className="trip-info__icons">
                                        <li>
                                            <img width="32px" height="32px" src={icon1} alt="иконка календаря" className="trip-info__icon" />
                                            {data.date}
                                        </li>
                                        <li>
                                            <img width="32px" height="32px" src={icon2} alt="иконка часов" className="trip-info__icon" />
                                            {data.date}
                                        </li>
                                        <li>
                                            <img width="32px" height="32px" src={icon3} alt="иконка компас" className="trip-info__icon" />
                                            {data.place}
                                        </li>
                                    </ul>
                                    <div className="trip-info__reserve">
                                        <div>
                                            <p className="trip-info__price">Цена:</p>
                                            <p className="trip-info__price-value">{data.price}₽</p>
                                        </div>
                                        <div className="button__background">
                                            <button
                                                className="trip-info__button"
                                                // (click)="openPopup(trip.bukzaUrl)"
                                            >
                                                ЗАБРОНИРОВАТЬ
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section className="travel-plan">
                                <div>
                                    <h3 className="travel-plan__title">План поездки</h3>
                                    <p className="travel-plan__text" dangerouslySetInnerHTML={{__html: data.travelPlan}}></p>
                                </div>
                                <div className="travel-plan__img">
                                    <img width="650px" height="504px" src={data.imgForTravelPlan} alt="фото поездки" className="" />
                                    image
                                </div>
                            </section>
                        </section>
                    </div>
                </div>

                {/* <!-- ТАРИФЫ -->
          <!-- <app-tariff [trip]="trip" *ngIf="readyForWork" [season] = "season"></app-tariff> -->
          <!-- END ТАРИФЫ -->
      
          <!-- VIDEO -->
          <div class="page " *ngIf="readyForWork">
            <div class="pageContent">
              <app-trip-video *ngIf="readyForWork && trip.video" [video]="this.trip.video"></app-trip-video>
            </div>
          </div>
          <!-- END VIDEO -->*/}

                {/* <!-- content end --> */}
                {/* <!-- footer start --> */}
                <div className="page">
                    <div className="pageContent">
                        <Footer season={season} />
                        <picture className={`page__background_footer ${season === "winter" ? "page__background_footer-winter" : ""} lazy-image`} ref={lazyImage}>
                            <source media="(min-width: 1600px)" data-srcset={dataFooter.photos[0]} type="image/webp" />
                            <source media="(min-width: 1040px)" data-srcset={dataFooter.photos[1]} type="image/webp" />
                            <source media="(min-width: 600px)" data-srcset={dataFooter.photos[2]} type="image/webp" />
                            <source data-srcset={dataFooter.photos[3]} type="image/webp" />
                            <img width="1980px" height="1080px" src={dataFooter.photos[4]} data-srcset={dataFooter.photos[4]} srcSet={dataFooter.slug} alt={dataFooter.alt} />
                        </picture>
                        {/* <!-- фоновые картинки footer --> */}
                    </div>
                </div>
                {/* <!-- footer end --> */}
            </div>
            {/* <!-- кнопка вверх -->  */}
            <GoUp />
        </div>
    );
};

export default withRouter(TripPage);
