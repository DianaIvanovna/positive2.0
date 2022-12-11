import React from "react";
import styles from "./Loading.module.scss";
import logoWebp from "../../../public_html/wp-content/themes/pozitiv/img/logo/logo-big_a1b.webp";
import logoPng from "../../../public_html/wp-content/themes/pozitiv/img/logo/logo-big.png";

export const Loading = () => {
    return (
        <div className={styles.loading}>
            <picture className={styles.loading__pulse}>
                <source srcSet={logoWebp} type="image/webp" />
                <img width="106px" height="106px" src={logoPng} alt="логтип positive" />
            </picture>
        </div>
    );
};
