import React, {useEffect, useMemo, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

import "./Header.scss";

import logoWebp from "img/logo/logo-big_a1b.webp";
import logo from "img/logo/logo-big.png";

import {SVG} from "src/components/icons";
import {ErrorBoundary} from "src/components/ErrorBoundary/ErrorBoundary";
import {useLocationSeason} from "src/hooks/useLocationSeason";
import {useBoundAction} from "src/hooks/useBoundAction";
import {authPopupAction, logout} from "src/store/action/authAction";
import {useSeasonNavigate} from "src/hooks/useSeasonNavigate";

const Header = () => {
    const [showScroll, setShowScroll] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [isAccount, setIsAccount] = useState(false);
    const navigate = useSeasonNavigate();
    const location = useLocation();
    const season = useLocationSeason();
    const auth = useSelector(store => store.auth.auth);
    const logoutHandler = useBoundAction(() => logout());
    const popupAuthHandler = useBoundAction(() => authPopupAction(true));

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

    const button = useMemo(() => {
        if (auth) {
            if (isAccount) {
                return (
                    <button
                        className="header__button-enter"
                        onClick={() => {
                            logoutHandler();
                            navigate("");
                        }}
                    >
                        Выход
                        <SVG id="logout" width="14px" height="14px" />
                    </button>
                );
            }

            return (
                <button
                    className="header__button-enter"
                    onClick={() => {
                        navigate("account", true);
                    }}
                >
                    Профиль
                </button>
            );
        }

        return (
            <button
                className="header__button-enter"
                onClick={() => {
                    //navigate("/account");
                    popupAuthHandler();
                }}
            >
                Войти
                <SVG id="logout" width="14px" height="14px" />
            </button>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAccount, auth]);

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler);

        return () => {
            document.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    useEffect(() => {
        if (location.pathname.includes("/account")) {
            setIsAccount(true);
        } else {
            setIsAccount(false);
        }
    }, [location]);

    return (
        <ErrorBoundary>
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
                                navigate("", true);
                            }}
                        >
                            <source srcSet={logoWebp} type="image/webp" />
                            <img width="106px" height="106px" src={logo} alt="логтип positive" />
                        </picture>

                        <nav className="header__nav">
                            <NavLink className="header__link" to={`/${season}/`}>
                                Наши поездки
                            </NavLink>
                            <NavLink className="header__link" to={`/${season}/rent`}>
                                Прокат снаряжения
                            </NavLink>
                            {/* <NavLink className="header__link" to={`/${season}/`}>
                                Фотогалерея
                            </NavLink>
                            <NavLink className="header__link" to={`/${season}/`}>
                                Отзывы
                            </NavLink> */}
                        </nav>
                        <div className="header__tel">
                            <a href="tel:+79226999898" className="header__number">
                                +7 (922) 699-98-98
                            </a>
                            <div className="header__container-message">
                                <a href="https://vk.com/pozitiv74" target="_blank" rel="noreferrer">
                                    <SVG id="vk" width="30px" height="30px" className="header__icon" />
                                </a>

                                {/* <a href="https://www.instagram.com/pozitivtour/" target="_blank">
                                <img width="30px" height="30px" src={instagram} alt="instagram" className="header__icon" />
                            </a> */}

                                <a href="https://t.me/pozitivtour" target="_blank" rel="noreferrer">
                                    <SVG id="telegram" width="30px" height="30px" className="header__icon" />
                                </a>

                                <a href="https://wa.me/79226999898" target="_blank" rel="noreferrer">
                                    <SVG id="whatsapp" width="30px" height="30px" className="header__icon" />
                                </a>

                                <a href="viber://chat?number=79226999898" target="_blank" rel="noreferrer">
                                    <SVG id="viber" width="30px" height="30px" className="header__icon" />
                                </a>
                            </div>
                        </div>

                        {button}
                        {/* <img
                            width="20px"
                            height="25px"
                            src={menuButton}
                            alt="иконка меню"
                            className="header__menu"
                            onClick={() => {
                                setMobile(value => !value);
                            }}
                        /> */}

                        <div
                            alt="иконка меню"
                            className="header__menu"
                            onClick={() => {
                                setMobile(value => !value);
                            }}
                        >
                            <SVG id="menu-button" width="20px" height="25px" />
                        </div>
                    </div>

                    <div className="header__container-mobule">
                        <nav className="header__nav">
                            <NavLink className="header__link" to={`/${season}/`}>
                                Наши поездки
                            </NavLink>
                            <NavLink className="header__link" to={`/${season}/rent`}>
                                Прокат снаряжения
                            </NavLink>
                            <NavLink className="header__link" to={`/${season}/`}>
                                Фотогалерея
                            </NavLink>
                            <NavLink className="header__link" to={`/${season}/`}>
                                Отзывы
                            </NavLink>
                            {button}
                        </nav>
                    </div>
                </header>
            </section>
        </ErrorBoundary>
    );
};

export default Header;
