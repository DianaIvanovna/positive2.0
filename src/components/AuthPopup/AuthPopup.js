import React, {useCallback, useState} from "react";
import cn from "classnames";
import style from "./AuthPopup.module.scss";
import {popupStyle, Popup} from "src/components/Popup";
import {SVG} from "src/components/icons";
import {AuthForm} from "./part/AuthForm";
import {RegForm} from "./part/RegForm";
import {SuccessForm} from "./part/SuccessForm";
import {useSelector} from "react-redux";
import {useBoundAction} from "src/hooks/useBoundAction";
import {authPopupAction, showPopupRegSuccess} from "src/store/action/authAction";

export const AuthPopup = () => {
    const [authPopupValue, auth__loading, auth__error, reg__loading, reg__error, reg_success_popup] = useSelector(store => [
        store.auth.authPopup,
        store.auth.auth__loading,
        store.auth.auth__error,
        store.auth.reg__loading,
        store.auth.reg__error,
        store.auth.reg_success_popup,
    ]);
    const popupAuthHandler = useBoundAction(() => authPopupAction(false));
    const popupRegSuccessHandler = useBoundAction(() => showPopupRegSuccess(false));
    const [form, setForm] = useState("auth");

    const closePopup = useCallback(() => {
        popupAuthHandler();
        setForm("auth");
    }, [popupAuthHandler]);
    const closePopupRegSuccess = useCallback(() => {
        popupRegSuccessHandler();
        setForm("auth");
    }, [popupRegSuccessHandler]);

    return (
        <>
            {authPopupValue ? (
                <Popup openPopup={authPopupValue} setOpenPopup={closePopup} zIndex={200}>
                    <div className={style.auth}>
                        <div className={cn(popupStyle.popup__icon, style.auth__close)} onClick={closePopup}>
                            <SVG id="cancel" width={24} height={24} />
                        </div>

                        {form === "auth" ? <AuthForm setForm={setForm} disabled={auth__loading} error={auth__error} /> : <RegForm setForm={setForm} disabled={reg__loading} error={reg__error} />}
                    </div>
                </Popup>
            ) : null}
            {reg_success_popup ? (
                <Popup openPopup={reg_success_popup} setOpenPopup={closePopupRegSuccess} zIndex={200}>
                    <div className={cn(style.auth, style["auth--second"])}>
                        <div className={cn(popupStyle.popup__icon, style.auth__close)} onClick={closePopupRegSuccess}>
                            <SVG id="cancel" width={24} height={24} />
                        </div>

                        <SuccessForm closePopup={closePopupRegSuccess} />
                    </div>
                </Popup>
            ) : null}
        </>
    );
};
