import React, {useEffect, useState} from "react";
import "./Header.scss";
import {NavLink, withRouter} from "react-router-dom";

import logoWebp from "../../../public_html/wp-content/themes/pozitiv/img/logo/logo-big_a1b.webp";
import logo from "../../../public_html/wp-content/themes/pozitiv/img/logo/logo-big.png";
import vk from "../../../public_html/wp-content/themes/pozitiv/img/soc-icon/vk.svg";
import telegram from "../../../public_html/wp-content/themes/pozitiv/img/soc-icon/telegram.svg";
import whatsapp from "../../../public_html/wp-content/themes/pozitiv/img/soc-icon/whatsapp.svg";
import viber from "../../../public_html/wp-content/themes/pozitiv/img/soc-icon/viber.svg";
import menuButton from "../../../public_html/wp-content/themes/pozitiv/img/Icon/menu-button.svg";
// import instagram from "../../../public_html/wp-content/themes/pozitiv/img/soc-icon/instagram.svg";

const Header = ({season = "winter", ...props}) => {
    const [showScroll, setShowScroll] = useState(false);
    const [mobile, setMobile] = useState(false);

    const scrollHandler = () => {
        if (window.pageYOffset === 0) {
            setShowScroll(false);
        } else {
            setShowScroll(true);
        }
    };

    // const scrollTo = event => {
    //     event.preventDefault();
    //     setMobile(false);

    //     const link = event.target.getAttribute("data-href");
    //     const anchor = event.target.getAttribute("data-anchor");

    //     if (link && anchor) {
    //         //   this.router.navigate( [link], {
    //         //     queryParams: {
    //         //       'season': this.season,
    //         //     },
    //         //     fragment: anchor
    //         //   });
    //     }
    // };

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler);

        return () => {
            document.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    return (
        <section className={`section-header ${showScroll ? "section-header_scroll" : ""} ${mobile ? "header_mobule_active" : ""}`}>
            {mobile ? (
                <div
                    className="section-header__mobile"
                    onClick={() => {
                        setMobile(value => !value);
                    }}
                ></div>
            ) : null}

            <header className="header">
                <div className="header__container">
                    <picture
                        className="header__logo"
                        onClick={() => {
                            props.history.push("/");
                        }}
                    >
                        <source srcSet={logoWebp} type="image/webp" />
                        <img width="106px" height="106px" src={logo} alt="логтип positive" />
                    </picture>

                    <nav className="header__nav">
                        <NavLink className="header__link" exact to={`/trips?season=${season}`}>
                            Наши поездки
                        </NavLink>
                        <NavLink className="header__link" exact to={`/rent?season=${season}`}>
                            Прокат снаряжения
                        </NavLink>
                        <NavLink className="header__link" exact to="/trips">
                            Фотогалерея
                        </NavLink>
                        <NavLink className="header__link" exact to="/trips">
                            Отзывы
                        </NavLink>
                    </nav>
                    <div className="header__tel">
                        <a href="tel:+79226999898" className="header__number">
                            +7 (922) 699-98-98
                        </a>
                        <div className="header__container-message">
                            <a href="https://vk.com/pozitiv74" target="_blank" rel="noreferrer">
                                <img width="30px" height="30px" src={vk} alt="vk" className="header__icon" />
                            </a>

                            {/* <a href="https://www.instagram.com/pozitivtour/" target="_blank">
                                <img width="30px" height="30px" src={instagram} alt="instagram" className="header__icon" />
                            </a> */}

                            <a href="https://t.me/pozitivtour" target="_blank" rel="noreferrer">
                                <img width="30px" height="30px" src={telegram} alt="telegram" className="header__icon" />
                            </a>

                            <a href="https://wa.me/79226999898" target="_blank" rel="noreferrer">
                                <img width="30px" height="30px" src={whatsapp} className="header__icon" alt="whatsapp" />
                            </a>

                            <a href="viber://chat?number=79226999898" target="_blank" rel="noreferrer">
                                <img width="30px" height="30px" src={viber} alt="viber" className="header__icon" />
                            </a>
                        </div>
                    </div>
                    <img
                        width="20px"
                        height="25px"
                        src={menuButton}
                        alt="иконка меню"
                        className="header__menu"
                        onClick={() => {
                            setMobile(value => !value);
                        }}
                    />
                </div>

                <div className="header__container-mobule">
                    <nav className="header__nav">
                        <NavLink
                            className="header__link"
                            exact
                            activeClassName="header__links--active"
                            to="/trips"
                            // onClick={() => {
                            //     scrollUp(props, "/about");
                            // }}
                        >
                            Наши поездки
                        </NavLink>
                        <NavLink className="header__link" exact to="/trips">
                            Прокат снаряжения
                        </NavLink>
                        <NavLink className="header__link" exact to="/rent">
                            Фотогалерея
                        </NavLink>
                        <NavLink className="header__link" exact to="/trips">
                            Отзывы
                        </NavLink>
                    </nav>
                </div>
            </header>
        </section>
    );
};

export default withRouter(Header);
