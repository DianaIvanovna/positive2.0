import React from "react";
import style from "./ReconstructionPage.module.scss";
import cn from "classnames";
import preview1 from "../../../public_html/wp-content/themes/pozitiv/img/home-page/preview-summer_4f7.webp";
import preview2 from "../../../public_html/wp-content/themes/pozitiv/img/home-page/preview-summer_58a.webp";
import preview3 from "../../../public_html/wp-content/themes/pozitiv/img/home-page/preview-summer_edb.webp";
import preview4 from "../../../public_html/wp-content/themes/pozitiv/img/home-page/preview-summer_062.jpg";

import preview5 from "../../../public_html/wp-content/themes/pozitiv/img/home-page/preview-winter_13d.webp";
import preview6 from "../../../public_html/wp-content/themes/pozitiv/img/home-page/preview-winter_7d2.webp";
import preview7 from "../../../public_html/wp-content/themes/pozitiv/img/home-page/preview-winter_e9b.webp";
import preview8 from "../../../public_html/wp-content/themes/pozitiv/img/home-page/preview-winter_59e.jpg";

export const ReconstructionPage = () => {
    return (
        <section className={style.page}>
            {/* <h1>Сайт находится на реконструкции</h1> */}
            <div className={style["page__title-container"]}>
                <h2 className={style.page__title}>Сайт находится на реконструкции</h2>
            </div>
            <div className={cn(style.page__container, style.page__container_1)}>
                <picture className={cn(style.page__img, style.page__img_summer)}>
                    <source media="(min-width: 1440px)" srcSet={preview1} type="image/webp"></source>
                    <source media="(min-width: 600px)" srcSet={preview2} type="image/webp"></source>
                    <source srcSet={preview3} type="image/webp"></source>
                    <img width="960px" height="1080px" src={preview4} alt="летние поездки" />
                </picture>
            </div>
            <div className={cn(style.page__container, style.page__container_2)}>
                <picture className={cn(style.page__img)}>
                    <source media="(min-width: 1440px)" srcSet={preview5} type="image/webp" />
                    <source media="(min-width: 600px)" srcSet={preview6} type="image/webp" />
                    <source srcSet={preview7} type="image/webp" />
                    <img width="960px" height="1080px" src={preview8} alt="зимние поездки" />
                </picture>
            </div>
        </section>
    );
};
