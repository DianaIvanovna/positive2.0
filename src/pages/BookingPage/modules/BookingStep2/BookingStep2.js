import {useFormik, FormikProvider} from "formik";
import React from "react";
import bookingStyle from "./BookingStep2.module.scss";
// import cn from "classnames";
import {TouristsInputs} from "./path/TouristsInputs/TouristsInputs";
import {Input} from "src/components/Input/Input";
import {MainButton} from "src/components/MainButton/MainButton";

const initialValuesTourist = order => {
    if (order?.data) {
        return order.data;
    }

    return [
        {
            firstName: "",
            phone: "",
            emai: "",
        },
    ];
};

const BookingStep2 = props => {
    // order = {order};
    const formik = useFormik({
        initialValues: {
            tourists: initialValuesTourist(props.order),
            comment: "",
        },
        onSubmit: values => {
            props.setOrder(prev => {
                return {
                    ...prev,
                    phoneOwner: values.tourists[0].phone,
                    emailOwner: values.tourists[0].emai,
                    firstNameOwner: values.tourists[0].firstName,
                    lastNameOwner: "",
                    data: values.tourists,
                };
            });

            props.onContinue();
        },
    });

    return (
        <>
            <FormikProvider value={formik}>
                <div className={bookingStyle.booking}>
                    <TouristsInputs formik={formik} />
                </div>
                <div className={bookingStyle.booking}>
                    <div className={bookingStyle["booking__comment-container"]}>
                        <div className={bookingStyle["booking__comment-block"]}>
                            <h2 className={bookingStyle["booking__title-h2"]}>Комментарий</h2>
                            <Input name="comment" placeholder="Может есть что-то еще, что мы должны знать?" className={bookingStyle["input-textarea"]} component="textarea" />
                        </div>
                        <div className={bookingStyle["booking__comment-block"]}>
                            <h2 className={bookingStyle["booking__title-h2"]}>Нажмите «Продолжить»</h2>
                            <p className={bookingStyle.booking__subtitle}>Чтобы перейти к следующему шагу, </p>
                            <MainButton text="продолжить" onClick={formik.handleSubmit} />
                        </div>
                    </div>
                </div>
            </FormikProvider>
        </>
    );
};

export default BookingStep2;
