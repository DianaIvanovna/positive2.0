import React, {useState} from "react";
import "./BookingStep1.scss";
import {funcIcon} from "./data";
import DayPicker from "react-day-picker";

const data = [
    {
        date: "25.08.2022 - 26.08.2022",
        number: 78,
        numberMax: 100,
    },
    {
        date: "27.08.2022 - 28.08.2022",
        number: 68,
        numberMax: 100,
    },
    {
        date: "29.08.2022 - 30.08.2022",
        number: 88,
        numberMax: 100,
    },
];

const MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const WEEKDAYS_LONG = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const WEEKDAYS_SHORT = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

const BookingStep1 = () => {
    const [active, setActive] = useState(false);

    return (
        <section>
            <div className="booking-step-1">
                <p className="booking-step-1__title">Выберите дату</p>
                <DayPicker
                    locale="ru"
                    months={MONTHS}
                    weekdaysLong={WEEKDAYS_LONG}
                    weekdaysShort={WEEKDAYS_SHORT}
                    className={`day-calendar `}
                    firstDayOfWeek={1}
                    onMonthChange={date => {
                        // eslint-disable-next-line no-console
                        console.log("date", date);
                    }}
                />
                {data.map((item, index) => (
                    <div
                        className={`booking-step-1__line ${active === index ? "booking-step-1__line--active" : ""}`}
                        key={index}
                        onClick={() => {
                            setActive(index);
                        }}
                    >
                        <div className="booking-step-1__icon">{funcIcon(active === index ? "#ffffff" : "#F1A22C")}</div>
                        <p className="booking-step-1__date">{item.date}</p>
                        <div className="booking-step-1__number">
                            {item.number}/{item.numberMax}
                        </div>
                    </div>
                ))}
                <div className="button__background booking-step-1__button">
                    <button
                        className="button"
                        disabled={!active}
                        //(click)="scrollToBook($event, data.link)"
                    >
                        Продолжить
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BookingStep1;
