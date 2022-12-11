import React, {useCallback, useState} from "react";
import "./BookingStep1.scss";
import {funcIcon} from "./data";
import DayPicker from "react-day-picker";
import {MainButton} from "../../../../components/MainButton/MainButton";
import {MONTHS, WEEKDAYS_SHORT, WEEKDAYS_LONG} from "../../../../constants/calendarData";

const BookingStep1 = ({bookingTour, ...props}) => {
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

    if (!bookingTour) {
        return <p>что-то не так</p>;
    }

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
                {bookingTour.trips.map((item, index) => (
                    <div
                        className={`booking-step-1__line ${active === item.id ? "booking-step-1__line--active" : ""}`}
                        key={index}
                        onClick={() => {
                            setActive(item.id);
                        }}
                    >
                        <div className="booking-step-1__icon">{funcIcon(active === item.id ? "#ffffff" : "#F1A22C")}</div>
                        <p className="booking-step-1__date">
                            {item.dateStart} - {item.dateEnd}
                        </p>
                        <div className="booking-step-1__number">0/{item.touristLimit}</div>
                    </div>
                ))}

                <MainButton text="ПРОДОЛЖИТЬ" className="booking-step-1__button" disabled={!active} onClick={nextStep} />
            </div>
        </section>
    );
};

export default BookingStep1;
