import React from "react";
import style from "../AuthPopup.module.scss";
import {useFormik, FormikProvider} from "formik";
import {Input} from "src/components/Input/Input";
import {MainButton} from "src/components/MainButton/MainButton";
import {useBoundAction} from "src/hooks/useBoundAction";
import {regFetch} from "../../../store/action/authAction";
import * as Yup from "yup";
import {purify} from "src/utils/purify";

const regSchema = Yup.object().shape({
    phone: Yup.string().required("Обязательное поле").min(11),
    email: Yup.string().email("Невалидный email").required("Обязательное поле"),
    firstName: Yup.string().required("Обязательное поле"),
    lastName: Yup.string().required("Обязательное поле"),
});

export const RegForm = ({setForm, disabled, error}) => {
    const popupRegHandler = useBoundAction(data => regFetch(data));

    const formik = useFormik({
        initialValues: {
            phone: "",
            email: "",
            firstName: "",
            lastName: "",
        },
        validationSchema: regSchema,
        onSubmit: values => {
            const formData = new FormData();

            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, purify(value));
            });
            popupRegHandler(formData);
        },
    });

    const {errors, touched, handleChange, handleBlur} = formik;

    return (
        <>
            <h2 className={style.auth__title}>Регистрация</h2>
            <p className={style.auth__subtitle}>в личном кабинете</p>
            <FormikProvider value={formik}>
                <Input
                    name="lastName"
                    placeholder="Фамилия"
                    className={style.auth__input}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showError={Boolean(errors.lastName) && Boolean(touched.lastName)}
                    error={String(errors.lastName)}
                />
                <Input
                    name="firstName"
                    placeholder="Имя"
                    className={style.auth__input}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showError={Boolean(errors.firstName) && Boolean(touched.firstName)}
                    error={String(errors.firstName)}
                />
                <Input
                    name="phone"
                    placeholder="Телефон"
                    className={style.auth__input}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showError={Boolean(errors.phone) && Boolean(touched.phone)}
                    error={String(errors.phone)}
                />
                <Input
                    name="email"
                    placeholder="Почта"
                    className={style.auth__input}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showError={Boolean(errors.email) && Boolean(touched.email)}
                    error={String(errors.email)}
                />
                {error ? <p className={style.auth__error}>{error}</p> : null}
                <MainButton text="Зарегистрироваться" className={style.auth__button} onClick={formik.handleSubmit} disabled={disabled} />
                <p className={style["auth__text-second"]}>
                    <span
                        onClick={() => {
                            setForm("auth");
                        }}
                    >
                        Войти в аккаунт
                    </span>
                </p>
                <p className={style["auth__text-second"]}>
                    Регистрируясь, Вы соглашаетесь с условиями
                    <br /> пользовательского соглашения
                </p>
            </FormikProvider>
        </>
    );
};
