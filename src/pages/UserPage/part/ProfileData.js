import React, {useState} from "react";
import {Input} from "src/components/Input/Input";
import {useFormik, FormikProvider} from "formik";
import {useSelector} from "react-redux";
import {MainButton} from "src/components/MainButton/MainButton";
import cn from "classnames";
import style from "./ProfileData.module.scss";

export const ProfileData = () => {
    const user = useSelector(store => store.user.user);
    const [blockUserData, setBlockUserData] = useState(true);

    const formik = useFormik({
        initialValues: {
            firstName: user?.display_name,
            phone: "",
            email: user?.user_email,
        },
        onSubmit: values => {
            // добавить изменение данных пользователя
            // eslint-disable-next-line no-console
            console.log("values", values);
        },
    });

    const buttonHandler = () => {
        if (blockUserData) {
            setBlockUserData(false);
        } else {
            formik.handleSubmit();
            setBlockUserData(true);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div>
            <FormikProvider value={formik}>
                <div className={style.profile}>
                    <div className={style.inputs}>
                        <Input name="firstName" label="ФИО" placeholder="ФИО*" disabled={blockUserData} classNameLabel={style["input-block"]} className={style.input} />
                        <Input name="phone" label="Телефон" placeholder="Телефон*" disabled={blockUserData} classNameLabel={style["input-block"]} className={style.input} />
                        <Input name="email" label="Почта" placeholder="E-mail*" disabled={blockUserData} classNameLabel={style["input-block"]} className={style.input} />
                    </div>
                    <MainButton text={blockUserData ? "Изменить данные" : "Сохранить"} onClick={buttonHandler} classButton="button-second" className={cn(style.order__button, style.button)} />
                </div>
            </FormikProvider>
        </div>
    );
};
