import React from "react";
import styles from "./MainButton.module.scss";
import cn from "classnames";

export const MainButton = props => {
    const classButton = props.classButton ? styles[props.classButton] : styles.button;

    return (
        <button className={cn(classButton, props.className)} onClick={props.onClick} disabled={props.disabled}>
            {props.children ? props.children : props.text}
        </button>
    );
};
