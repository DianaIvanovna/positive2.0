import React from "react";
import style from "./OrderCard.module.scss";
import {SVG} from "src/components/icons";
import {MainButton} from "../MainButton/MainButton";
import cn from "classnames";

export const OrderCard = ({data, first = false, end = false, selectOrderHandler}) => {
    return (
        <div className={cn(style.order, first ? style["order--first"] : false, end ? style["order--end"] : false)}>
            <img src={data.photo} alt={data.title} className={style.order__img} />
            <div className={style.order__main}>
                {/* <div className={style.order__header}></div> */}

                <div className={style.order__header}>
                    <p className={style.order__title}>{data.title}</p>
                    <p className={style.order__date}>{data.date}</p>
                </div>

                <p className={style.order__number}>
                    <SVG id="person" width={24} height={24} />
                    Кол-во человек: <span> {data.numberPerson}</span>
                </p>
                <div className={style["order__payment-container"]}>
                    <div className={style.order__payment}>
                        Сумма:
                        <p className={style["order__payment-value"]}>
                            {data.payment}
                            <span> ₽</span>
                        </p>
                    </div>
                    <div className={style.order__payment}>
                        Предоплата:
                        <p className={style["order__payment-value"]}>
                            {data.prepayment}
                            <span> ₽</span>
                        </p>
                    </div>
                </div>
                <MainButton
                    onClick={() => {
                        selectOrderHandler(data);
                    }}
                    classButton="button-second"
                    className={cn(style.order__button, style["order__button--1200"])}
                >
                    Подробнее
                    <SVG id="left-arrow" width={24} height={24} />
                </MainButton>
                {/* <div className={style["order__payment-container"]}></div> */}
            </div>
            <MainButton
                onClick={() => {
                    selectOrderHandler(data);
                }}
                classButton="button-second"
                className={style.order__button}
            >
                Подробнее
                <SVG id="left-arrow" width={24} height={24} />
            </MainButton>
        </div>
    );
};
