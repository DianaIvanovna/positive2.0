import React from "react";
import style from "../AuthPopup.module.scss";
import {useFormik, FormikProvider} from "formik";
import {Input} from "src/components/Input/Input";
import {MainButton} from "src/components/MainButton/MainButton";

export const RegForm = ({disabled}) => {
    const formik = useFormik({
        initialValues: {
            name: "",
            login: "",
            pass: "",
        },
        onSubmit: values => {
            // eslint-disable-next-line no-console
            console.log("values", values);
        },
    });

    return (
        <>
            <h2 className={style.auth__title}>Регистрация</h2>
            <p className={style.auth__subtitle}>в личном кабинете</p>
            <FormikProvider value={formik}>
                <Input name="name" placeholder="ФИО" className={style.auth__input} />
                <Input name="login" placeholder="Почта" className={style.auth__input} />
                <Input name="pass" placeholder="Пароль" className={style.auth__input} />
                <Input name="pass" placeholder="Подвердите пароль" className={style.auth__input} />
                <MainButton text="Зарегистрироваться" className={style.auth__button} onClick={formik.handleSubmit} disabled={disabled} />
                <p className={style["auth__text-second"]}>
                    Регистрируясь, Вы соглашаетесь с условиями
                    <br /> пользовательского соглашения
                </p>
            </FormikProvider>
        </>
    );
};
