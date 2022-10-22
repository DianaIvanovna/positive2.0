import React from "react";
import "./Preloader.scss";
import logo1 from "../../../public_html/wp-content/themes/pozitiv/img/logo/logo-big_a1b.webp";
import logo2 from "../../../public_html/wp-content/themes/pozitiv/img/logo/logo-big.png";

const Preloader = ({className}) => {
    return (
        <div className={`${className ? className : ""} preloader`}>
            <picture className=" preloader__pulse">
                <source srcSet={logo1} type="image/webp" />
                <img width="186px" height="186px" src={logo2} alt="логотип" />
            </picture>
        </div>
    );
};

export default Preloader;
