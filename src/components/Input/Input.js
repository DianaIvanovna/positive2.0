import React from "react";
import cn from "classnames";
import styles from "./Input.module.scss";
import {Field} from "formik";

export const Input = props => {
    // eslint-disable-next-line no-unused-vars
    const {className, errors} = props;

    return <Field {...props} autoFocus={props.autoFocus} className={cn(styles.input, className)} autoComplete="off" />;
};
