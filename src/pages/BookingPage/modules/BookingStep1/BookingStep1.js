import React, {useCallback, useState} from "react";
import "./BookingStep1.scss";
import {funcIcon} from "./data";
import DayPicker from "react-day-picker";
import {MainButton} from "../../../../components/MainButton/MainButton";
import {MONTHS, WEEKDAYS_SHORT, WEEKDAYS_LONG} from "../../../../constants/calendarData";

const data = [
    {
        date: "25.08.2022 - 26.08.2022",
        number: 78,
        numberMax: 100,
        id: 5,
    },
    {
        date: "27.08.2022 - 28.08.2022",
        number: 68,
        numberMax: 100,
        id: 7,
    },
    {
        date: "29.08.2022 - 30.08.2022",
        number: 88,
        numberMax: 100,
        id: 510,
    },
];

const BookingStep1 = props => {
    const [active, setActive] = useState(props.order.id);

    const nextStep = useCallback(() => {
        props.setOrder(prev => {
            return {
                ...prev,
                id: active,
            };
        });

        props.onContinue();
    }, [active, props]);

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
                        className={`booking-step-1__line ${active === item.id ? "booking-step-1__line--active" : ""}`}
                        key={index}
                        onClick={() => {
                            setActive(item.id);
                        }}
                    >
                        <div className="booking-step-1__icon">{funcIcon(active === item.id ? "#ffffff" : "#F1A22C")}</div>
                        <p className="booking-step-1__date">{item.date}</p>
                        <div className="booking-step-1__number">
                            {item.number}/{item.numberMax}
                        </div>
                    </div>
                ))}

                <MainButton text="ПРОДОЛЖИТЬ" className="booking-step-1__button" disabled={!active} onClick={nextStep} />
            </div>
        </section>
    );
};

export default BookingStep1;
