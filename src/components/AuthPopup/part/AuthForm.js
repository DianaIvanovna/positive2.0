import React from "react";
import style from "../AuthPopup.module.scss";
import {useFormik, FormikProvider} from "formik";
import {Input} from "src/components/Input/Input";
import {MainButton} from "src/components/MainButton/MainButton";
import {useBoundAction} from "src/hooks/useBoundAction";
import {authFetch} from "src/store/action/authAction";
import * as Yup from "yup";
import {purify} from "src/utils/purify";

const authSchema = Yup.object().shape({
    login: Yup.string().required("Обязательное поле"),
    pass: Yup.string().required("Обязательное поле"),
});

export const AuthForm = ({setForm, disabled, error}) => {
    const popupAuthHandler = useBoundAction(data => authFetch(data));

    const formik = useFormik({
        initialValues: {
            login: "",
            pass: "",
        },
        validationSchema: authSchema,
        onSubmit: values => {
            const formData = new FormData();

            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, purify(value));
            });
            popupAuthHandler(formData);
        },
    });

    const {errors, touched, handleChange, handleBlur} = formik;

    return (
        <>
            <h2 className={style.auth__title}>Авторизация</h2>
            <p className={style.auth__subtitle}>в личном кабинете</p>
            <FormikProvider value={formik}>
                <Input
                    name="login"
                    placeholder="Почта"
                    className={style.auth__input}
                    showError={Boolean(errors.login) && Boolean(touched.login)}
                    error={String(errors.login)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input
                    name="pass"
                    placeholder="Пароль"
                    className={style.auth__input}
                    showError={Boolean(errors.pass) && Boolean(touched.pass)}
                    error={String(errors.pass)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                />

                {error ? <p className={style.auth__error}>{error}</p> : null}
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
