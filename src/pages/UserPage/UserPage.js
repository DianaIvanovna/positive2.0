import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import cn from "classnames";
import style from "./UserPage.module.scss";
import {data} from "./data";

import Header from "src/components/Header/Header";
import {OrderCard} from "src/components/OrderCard/OrderCard";
import {PopupOrder} from "src/components/OrderCard/PopupOrder";
import {useOnScreen} from "src/hooks/useOnScreen";
import {useBoundAction} from "src/hooks/useBoundAction";
import {userGetOrders} from "src/store/action/userAction";
import {ProfileData} from "src/pages/UserPage/part/ProfileData";

import back from "img/background/back-user-page.png";

export const UserPage = () => {
    const title = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const isOnScreen = useOnScreen([title], []);
    const [openOrder, setOpenOrder] = useState(null);
    const getOrders = useBoundAction(data => userGetOrders());
    //userGetOrders

    useEffect(() => {
        getOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [nextTrip, prevTrip] = useMemo(() => {
        const next = [];
        const prev = [];
        const nowDay = new Date();

        data.forEach(item => {
            if (new Date(item.date) > nowDay) {
                next.push(item);
            } else {
                prev.push(item);
            }
        });

        return [next, prev];
    }, []);

    const selectOrderHandler = useCallback(item => {
        setOpenOrder(item);
    }, []);

    const closePopupOrder = useCallback(() => {
        setOpenOrder(null);
    }, []);

    return (
        <div className={cn("main", style.main)}>
            <Header />
            <div className={cn("main__contant", style.page)}>
                <div className="page">
                    <div className={cn("pageContent ", style.page)}>
                        {/* <button
                            onClick={() => {
                                logoutHandler();
                                navigate("/");
                            }}
                        >
                            Выход
                        </button> */}
                        <div className={style.page__header}>
                            <h1 className={cn("main-title", "anim__title")} ref={title}>
                                Мой кабинет
                            </h1>

                            <p className={style.page__bonus}>
                                Мои бонусы
                                <span className={style["page__bonus-value"]}>500</span>
                            </p>
                        </div>
                        <h2 className={style.page__title}>Личные данные</h2>
                        <ProfileData />

                        {/* <Input name={`tourists.${index}.emai`} placeholder="E-mail*" /> */}

                        <h2 className={style.page__title}>Предстоящие поездки</h2>
                        {nextTrip.map((item, index) => (
                            <OrderCard data={item} key={index} first={index === 0} end={index === nextTrip.length - 1} selectOrderHandler={selectOrderHandler} />
                        ))}
                        <h2 className={style.page__title}>Предыдущие поездки</h2>

                        {prevTrip.map((item, index) => (
                            <OrderCard data={item} key={index} first={index === 0} end={index === prevTrip.length - 1} selectOrderHandler={selectOrderHandler} />
                        ))}

                        {openOrder ? <PopupOrder data={openOrder} openPopup={!!openOrder} setOpenPopup={closePopupOrder} /> : null}

                        {/*TODO: НУЖНО ДОБАВИТЬ ПОСМОТРЕТЬ ВСЕ */}
                    </div>
                    <picture className={`page__background_footer page__background_footer--center lazy-image`}>
                        <source media="(min-width: 1600px)" data-srcset={back} type="image/webp" />

                        <img width="1980px" height="1080px" src={back} data-srcset={back} srcSet={back} alt="фон" />
                    </picture>
                </div>
            </div>
        </div>
    );
};
