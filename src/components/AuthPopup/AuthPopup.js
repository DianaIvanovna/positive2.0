import React, {useState} from "react";
import cn from "classnames";
import style from "./AuthPopup.module.scss";
import {popupStyle, Popup} from "src/components/Popup";
import {SVG} from "src/components/icons";
import {AuthForm} from "./part/AuthForm";

import {RegForm} from "./part/RegForm";
import {useSelector} from "react-redux";
import {useBoundAction} from "src/hooks/useBoundAction";
import {authPopupAction} from "src/store/action/authAction";

export const AuthPopup = () => {
    const [authPopupValue, auth__loading] = useSelector(store => [store.auth.authPopup, store.auth.auth__loading]);
    const popupAuthHandler = useBoundAction(() => authPopupAction(false));
    const [form, setForm] = useState("auth");

    return (
        <Popup openPopup={authPopupValue} setOpenPopup={popupAuthHandler} zIndex={200}>
            <div className={style.auth}>
                <div className={cn(popupStyle.popup__icon, style.auth__close)} onClick={popupAuthHandler}>
                    <SVG id="cancel" width={24} height={24} />
                </div>

                {form === "auth" ? <AuthForm setForm={setForm} disabled={auth__loading} /> : <RegForm disabled={auth__loading} />}
            </div>
        </Popup>
    );
};
