import React from "react";
import bookingStyle from "src/pages/BookingPage/modules/BookingStep2/BookingStep2.module.scss";
import {Input} from "src/components/Input/Input";

export const TouristItem = ({index}) => {
    return (
        <div className={bookingStyle["booking__inputs-container"]}>
            <Input name={`tourists.${index}.firstName`} placeholder="ФИО*" />
            <Input name={`tourists.${index}.phone`} placeholder="Телефон*" />
            <Input name={`tourists.${index}.email`} placeholder="E-mail*" />
        </div>
    );
};
