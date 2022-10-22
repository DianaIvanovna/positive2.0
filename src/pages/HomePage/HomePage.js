import React from "react";
import "./HomePage.scss";
import {withRouter} from "react-router";

import Preloader from "../../components/Preloader/Preloader";
import preview1 from "../../../public_html/wp-content/themes/pozitiv/img/home-page/preview-summer_4f7.webp";
import preview2 from "../../../public_html/wp-content/themes/pozitiv/img/home-page/preview-summer_58a.webp";
import preview3 from "../../../public_html/wp-content/themes/pozitiv/img/home-page/preview-summer_edb.webp";
import preview4 from "../../../public_html/wp-content/themes/pozitiv/img/home-page/preview-summer_062.jpg";

import preview5 from "../../../public_html/wp-content/themes/pozitiv/img/home-page/preview-winter_13d.webp";
import preview6 from "../../../public_html/wp-content/themes/pozitiv/img/home-page/preview-winter_7d2.webp";
import preview7 from "../../../public_html/wp-content/themes/pozitiv/img/home-page/preview-winter_e9b.webp";
import preview8 from "../../../public_html/wp-content/themes/pozitiv/img/home-page/preview-winter_59e.jpg";

const HomePage = props => {
    const goPage = season => {
        props.history.push({
            pathname: "/trips",
            search: `?season=${season}`,
        });
    };

    return (
        <section className="home-page">
            <div
                className="home-page__container home-page__container_1"
                onClick={() => {
                    goPage("summer");
                }}
            >
                <picture className="home-page__img home-page__img_summer">
                    <source media="(min-width: 1440px)" srcSet={preview1} type="image/webp"></source>
                    <source media="(min-width: 600px)" srcSet={preview2} type="image/webp"></source>
                    <source srcSet={preview3} type="image/webp"></source>
                    <img width="960px" height="1080px" src={preview4} alt="летние поездки" />
                </picture>
                <div className="home-page__title-container">
                    <h2 className="home-page__title">лето</h2>
                    <p className="home-page__text home-page__text_1">
                        прокат туристического снаряжения
                        <br />
                        прокат велосипедов
                        <br />
                        путешествия по миру
                        <br />
                        велотуры
                        <br />
                        сплавы
                        <br />
                        походы
                        <br />
                    </p>
                    <pre id="demo"></pre>
                </div>
            </div>
            <div
                className="home-page__container home-page__container_2"
                onClick={() => {
                    goPage("winter");
                }}
            >
                <picture className="home-page__img">
                    <source media="(min-width: 1440px)" srcSet={preview5} type="image/webp" />
                    <source media="(min-width: 600px)" srcSet={preview6} type="image/webp" />
                    <source srcSet={preview7} type="image/webp" />
                    <img width="960px" height="1080px" src={preview8} alt="зимние поездки" />
                </picture>
                <div className="home-page__title-container">
                    <h2 className="home-page__title">зима</h2>
                    <p className="home-page__text home-page__text_2">
                        прокат горнолыжного снаряжения
                        <br />
                        Горнолыжные туры:
                        <br />
                        горы Урала
                        <br />
                        Шерегеш
                        <br />
                        Казахстан
                        <br />
                        Киргизия
                        <br />
                    </p>
                </div>
            </div>
            <div
                onClick={() => {
                    goPage("winter");
                }}
            >
                <Preloader className="home-page__logo home-page__logo_preview" />
            </div>
        </section>
    );
};

export default withRouter(HomePage);
