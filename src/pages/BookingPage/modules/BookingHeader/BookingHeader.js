import React from "react";
import styles from "./BookingHeader.module.scss";
import cn from "classnames";

const titles = ["Бронирование", "Выбор услуги", "Оплата"];

export const BookingHeader = ({step, ...props}) => {
    return (
        <div className={styles.header}>
            <div className={styles["title-container"]}>
                <div className={styles["link-button"]}>
                    <svg onClick={props.goBack} className={styles.arrow} alt="стрелка влево" width="74" height="72" viewBox="0 0 74 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M50.1224 59.2716C51.1232 58.3071 51.1301 56.7434 50.1156 55.7788L35.1138 41.4848L34.8488 41.2646C33.8348 40.5308 32.3854 40.6075 31.4648 41.4947C30.9661 41.9754 30.7116 42.6074 30.7116 43.2362C30.7116 43.8683 30.9661 44.5036 31.4717 44.9843L46.4735 59.2815L46.7385 59.5017C47.7525 60.2355 49.2019 60.1588 50.1224 59.2716ZM50.3482 15.965C51.1223 14.9969 51.0401 13.6092 50.1227 12.725C49.1184 11.7605 47.4848 11.7572 46.4737 12.7217L23.8851 34.2516L23.6532 34.5038C23.3017 34.943 23.125 35.4702 23.125 35.9996C23.125 36.6284 23.3795 37.2605 23.8782 37.7411C24.8824 38.709 26.516 38.7123 27.5272 37.7477L50.1158 16.2179L50.3482 15.965Z"
                            fill="#B7B7B7"
                        />
                    </svg>
                </div>
                <h2 className={styles.title}>{titles[step - 1]}</h2>
            </div>

            <div className={cn(styles["step-container"], styles[`step-container--${step}`])}>
                {/* booking-page__step-container--active-${tabIndex} */}
                <div className={styles["step-content"]}>
                    <div className={styles["step-item"]}>
                        <div className={cn(styles.step, styles["step--active"])}>Шаг 1</div>
                        <div className={styles["step-name"]}>Выбор даты</div>
                    </div>
                    <div className={cn(styles["step-item"], styles["step--2"])}>
                        <div className={cn(styles.step, step < 2 ? "" : styles["step--active"])}>Шаг 2</div>
                        <div className={styles["step-name"]}>Выбор услуг</div>
                    </div>
                    <div className={cn(styles["step-item"], styles["step--3"])}>
                        <div className={cn(styles.step, step < 3 ? "" : styles["step--active"])}>Шаг 3</div>
                        <div className={styles["step-name"]}>Оплата</div>
                    </div>
                </div>
                <div className={styles.line}>
                    <div className={styles.point}></div>
                </div>
            </div>
        </div>
    );
};
