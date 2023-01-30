// import React, {useEffect, useState} from "react";
import React from "react";
import style from "./Popup.module.scss";
// import {SVG} from "src/components/icons.js";
import cn from "classnames";

export const Popup = props => {
    return (
        <div className={cn(style.popup, props.openPopup ? style["popup--active"] : false, props.className ? props.className : false)} onClick={props.onClick}>
            <div className={cn(style.popup__content, props.className ? props.className : false)}>{props.children}</div>
        </div>
    );
};
