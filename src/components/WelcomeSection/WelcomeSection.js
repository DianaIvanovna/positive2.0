/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useRef} from "react";
import "./WelcomeSection.scss";
import icon from "img/Icon/Calendar.svg";
import {useOnScreen} from "src/hooks/useOnScreen";
import {MainButton} from "src/components/MainButton/MainButton";

const WelcomeSection = ({data, ...props}) => {
    const elementRef = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const isOnScreen = useOnScreen([elementRef]);

    return (
        <div className="page">
            <div className=" background-container--welcome">
                <picture className={`welcome__back-img ${data.className}`}>
                    <source media="(min-width: 1600px)" srcSet={data.photos[0]} type="image/webp" />
                    <source media="(min-width: 1040px)" srcSet={data.photos[1]} type="image/webp" />
                    <source srcSet={data.photos[2]} type="image/webp" />
                    <img width="1980px" height="800px" src={data.photos[3]} srcSet={data.slug} alt="фоновая картинка туристы" />
                </picture>
            </div>
            <div className="pageContent">
                <section className="welcome">
                    <div className={`anim__title ${data.page === "rent" ? "welcome__back-title_rent" : ""}`} ref={elementRef}>
                        <h1 className="welcome__title">
                            {data.title}
                            <p className="welcome__title_dark">{data.titleDark}</p>
                        </h1>
                        <p className="welcome__subtitle">{data.subtitle}</p>
                    </div>
                    <MainButton className="welcome__button">
                        <a href="#" className="welcome__link">
                            {data.page === "home" ? <img width="24px" height="28px" src={icon} alt="Иконка календаря" className="button__icon" /> : null}
                            {data.btnText}
                        </a>
                    </MainButton>
                </section>
            </div>
        </div>
    );
};

export default WelcomeSection;
