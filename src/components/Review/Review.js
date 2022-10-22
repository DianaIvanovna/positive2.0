import React, {useState} from "react";
import "./Review.scss";
import {reviews} from "./data";
import vk from "../../../public_html/wp-content/themes/pozitiv/img/Icon/vk.svg";

const Review = () => {
    const [activeButtonLeft, setActiveButtonLeft] = useState(false);
    const [activeButtonRight, setActiveButtonRight] = useState(true);
    const [activeReview, setActiveReview] = useState(0);

    const nextReview = () => {
        let active = activeReview;

        if (active !== reviews.length - 1) {
            active = active + 1;
            setActiveReview(active);
            setActiveButtonLeft(true);
        }

        if (active === reviews.length - 1) {
            setActiveButtonRight(false);
        }
    };

    const previousReview = () => {
        let active = activeReview;

        if (active !== 0) {
            active = active - 1;
            setActiveReview(active);
            setActiveButtonRight(true);
        }

        if (active === 0) {
            setActiveButtonLeft(false);
        }
    };

    const clickReview = event => {
        if (event.clientX < document.documentElement.clientWidth / 2) {
            previousReview();
        } else {
            nextReview();
        }
    };

    const openReview = i => {
        setActiveButtonRight(true);
        setActiveButtonLeft(true);

        if (i === 0) {
            setActiveButtonLeft(false);
        } else if (i === reviews.length - 1) {
            setActiveButtonRight(false);
        }

        setActiveReview(i);
    };

    return (
        <section className="review">
            <div className="forlink" id="review"></div>
            <div className="review__header">
                <h2 className="review__title anim__title">Отзывы</h2>
            </div>
            <div className="review__container">
                <svg
                    className={`review__button ${activeButtonLeft ? "review__button_active" : ""}`}
                    onClick={previousReview}
                    // (click)="previousReview()" [class.review__button_active]="activeButtonLeft"
                    // ng-disabled="!activeButtonLeft"
                    alt="стрелка влево"
                    width="74"
                    height="72"
                    viewBox="0 0 74 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    disabled={!activeButtonLeft}
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M50.1224 59.2716C51.1232 58.3071 51.1301 56.7434 50.1156 55.7788L35.1138 41.4848L34.8488 41.2646C33.8348 40.5308 32.3854 40.6075 31.4648 41.4947C30.9661 41.9754 30.7116 42.6074 30.7116 43.2362C30.7116 43.8683 30.9661 44.5036 31.4717 44.9843L46.4735 59.2815L46.7385 59.5017C47.7525 60.2355 49.2019 60.1588 50.1224 59.2716ZM50.3482 15.965C51.1223 14.9969 51.0401 13.6092 50.1227 12.725C49.1184 11.7605 47.4848 11.7572 46.4737 12.7217L23.8851 34.2516L23.6532 34.5038C23.3017 34.943 23.125 35.4702 23.125 35.9996C23.125 36.6284 23.3795 37.2605 23.8782 37.7411C24.8824 38.709 26.516 38.7123 27.5272 37.7477L50.1158 16.2179L50.3482 15.965Z"
                        fill="#B7B7B7"
                    />
                </svg>

                <div className="review__background">
                    <div className="review__content" onClick={clickReview}>
                        <picture className="review__avatar">
                            <source srcSet={reviews[activeReview].imgWebp} type="image/webp" />
                            <img width="200px" height="200px" src={reviews[activeReview].img} alt="фото гостя" />
                        </picture>
                        <p className="review__name">{reviews[activeReview].name}</p>
                        <p className="review__text">{reviews[activeReview].text}</p>
                        <a href={reviews[activeReview].link} target="_blank" className="review__link" rel="noreferrer">
                            <img src={vk} alt="Иконка vk" className="review__icon" />
                            Читать отзыв в Вконтакте
                        </a>
                    </div>
                </div>

                <svg
                    className={`review__button ${activeButtonRight ? "review__button_active" : ""}`}
                    // ng-disabled="!activeButtonRight"
                    disabled={!activeButtonRight}
                    onClick={nextReview}
                    alt="стрелка вправо"
                    width="74"
                    height="72"
                    viewBox="0 0 74 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M23.8776 12.7284C22.8768 13.6929 22.8699 15.2566 23.8844 16.2212L38.8862 30.5152L39.1512 30.7354C40.1652 31.4692 41.6146 31.3925 42.5352 30.5053C43.0339 30.0247 43.2884 29.3926 43.2884 28.7638C43.2884 28.1317 43.0339 27.4964 42.5283 27.0157L27.5265 12.7185L27.2615 12.4983C26.2475 11.7645 24.7981 11.8412 23.8776 12.7284ZM23.6518 56.035C22.8777 57.0031 22.9599 58.3908 23.8773 59.275C24.8816 60.2395 26.5152 60.2428 27.5263 59.2782L50.1149 37.7484L50.3468 37.4962C50.6983 37.057 50.875 36.5298 50.875 36.0004C50.875 35.3716 50.6205 34.7395 50.1218 34.2589C49.1176 33.291 47.484 33.2877 46.4728 34.2523L23.8842 55.7821L23.6518 56.035Z"
                        fill="#B7B7B7"
                    />
                </svg>
            </div>

            <div className="review__dashes">
                {reviews.map((item, i) => (
                    <svg
                        className={`review__hr ${i === activeReview ? "review__hr_active" : ""}`}
                        key={i}
                        width="35"
                        height="3"
                        onClick={() => {
                            openReview(i);
                        }}
                        viewBox="0 0 35 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="35" height="3" rx="1.5" fill="#C4C4C4" />
                    </svg>
                ))}
            </div>
        </section>
    );
};

export default Review;
