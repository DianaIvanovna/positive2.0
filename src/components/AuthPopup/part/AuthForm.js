import React from "react";
import style from "../AuthPopup.module.scss";
import {useFormik, FormikProvider} from "formik";
import {Input} from "src/components/Input/Input";
import {MainButton} from "src/components/MainButton/MainButton";
import {useBoundAction} from "src/hooks/useBoundAction";
import {authFetch} from "src/store/action/authAction";

export const AuthForm = ({setForm, disabled}) => {
    const popupAuthHandler = useBoundAction(data => authFetch(data));

    const formik = useFormik({
        initialValues: {
            login: "",
            pass: "",
        },
        onSubmit: values => {
            const formData = new FormData();

            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });
            popupAuthHandler(formData);
        },
    });

    return (
        <>
            <h2 className={style.auth__title}>Авторизация</h2>
            <p className={style.auth__subtitle}>в личном кабинете</p>
            <FormikProvider value={formik}>
                <Input name="login" placeholder="Почта" className={style.auth__input} />
                <Input name="pass" placeholder="Пароль" className={style.auth__input} />
                <p className={style.auth__text}>Забыли пароль?</p>
                <MainButton text="Войти" className={style.auth__button} onClick={formik.handleSubmit} disabled={disabled} />
                <p className={style["auth__text-second"]}>
                    У вас нет аккаунта?{" "}
                    <span
                        onClick={() => {
                            setForm("reg");
                        }}
                    >
                        Зарегистрироваться.
                    </span>
                </p>
            </FormikProvider>
        </>
    );
};
