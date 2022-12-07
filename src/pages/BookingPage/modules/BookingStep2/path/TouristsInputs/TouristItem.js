import React from "react";
import bookingStyle from "../../BookingStep2.module.scss";
import {Input} from "../../../../../../components/Input/Input";

export const TouristItem = ({index}) => {
    return (
        <div className={bookingStyle["booking__inputs-container"]}>
            <Input name={`tourists.${index}.name`} placeholder="ФИО*" />
            <Input name={`tourists.${index}.phone`} placeholder="Телефон*" />
            <Input name={`tourists.${index}.emai`} placeholder="E-mail*" />
        </div>
    );
};
