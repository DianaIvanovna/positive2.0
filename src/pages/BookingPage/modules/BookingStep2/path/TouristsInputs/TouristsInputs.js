import React from "react";
import {FieldArray} from "formik";
import {TouristItem} from "./TouristItem";
import bookingStyle from "../../BookingStep2.module.scss";
import {MainButton} from "../../../../../../components/MainButton/MainButton";
import {SvgAddPerson} from "./SvgAddPerson";

export const TouristsInputs = () => {
    return (
        <FieldArray name="tourists">
            {({push, form}) => {
                const onAddClick = () => {
                    push({
                        name: "",
                        phone: "",
                        emai: "",
                    });
                };

                return (
                    <div>
                        <h3 className={bookingStyle["booking__title-h3"]}>Личная информация</h3>
                        <p className={bookingStyle.booking__subtitle}>Заполните обязательные поля</p>
                        <TouristItem index={0} />
                        <h3 className={bookingStyle["booking__title-h3"]}>С вами едет кто-то еще?</h3>
                        <p className={bookingStyle.booking__subtitle}>Добавьте участников</p>
                        {form.values.tourists.length > 1 ? form.values.tourists.slice(1).map((item, index) => <TouristItem index={index + 1} key={index + 1} />) : null}
                        <MainButton onClick={onAddClick} classButton="button-second">
                            добавить <SvgAddPerson />
                        </MainButton>
                    </div>
                );
            }}
        </FieldArray>
    );
};
