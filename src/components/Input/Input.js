import React from "react";
import cn from "classnames";
import styles from "./Input.module.scss";
import {Field} from "formik";

export const Input = props => {
    // eslint-disable-next-line no-unused-vars
    const {className, errors, label, classNameLabel, showError, error, ...inputsProps} = props;

    if (label) {
        return (
            <label className={cn(styles["input-container"], classNameLabel)}>
                <p className={styles.label}>{label}</p>

                <Field {...inputsProps} autoFocus={props.autoFocus} className={cn(styles.input, className)} autoComplete="off" />
                {showError && <p className={styles.error}>{error}</p>}
            </label>
        );
    }

    return (
        <>
            <Field {...inputsProps} autoFocus={props.autoFocus} className={cn(styles.input, className)} autoComplete="off" />
            {showError && <p className={styles.error}>{error}</p>}
        </>
    );
};
