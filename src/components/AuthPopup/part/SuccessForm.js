import React from "react";
import style from "../AuthPopup.module.scss";
import {MainButton} from "src/components/MainButton/MainButton";

export const SuccessForm = ({closePopup}) => {
    return (
        <>
            <h2 className={style.auth__title}>Регистрация прошла успешно!</h2>
            <p className={style.auth__subtitle}>В течение некоторого времени вам на почту придет логин и ссылка на смену пароля</p>
            <MainButton text="Понятно" className={style.auth__button} onClick={closePopup} />
        </>
    );
};
