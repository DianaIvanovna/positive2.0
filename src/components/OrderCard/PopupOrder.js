import React from "react";
import {popupStyle, Popup} from "src/components/Popup";
import {SVG} from "src/components/icons";
import style from "./PopupOrder.module.scss";
import cn from "classnames";

export const PopupOrder = ({data, openPopup, setOpenPopup}) => {
    return (
        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} zIndex={200}>
            <div className={style["popup-order"]}>
                <div className={cn(popupStyle.popup__icon, style["popup-order__close"])} onClick={setOpenPopup}>
                    <SVG id="cancel" width={24} height={24} />
                </div>
                <h2 className={style["popup-order__title"]}>{data.title}</h2>
                <div className={style["popup-order__main-container"]}>
                    <div className={style["popup-order__container"]}>
                        <img src={data.photo} alt={data.title} className={style["popup-order__img"]} />

                        <div className={style["popup-order__item-container"]}>
                            <div className={style["popup-order__item"]}>
                                <p className={style["popup-order__item-name"]}>Дата:</p>
                                <span className={style["popup-order__item-value"]}>{data.date}</span>
                            </div>
                            <div className={style["popup-order__item"]}>
                                <p className={style["popup-order__item-name"]}>Длительность:</p>
                                <span className={style["popup-order__item-value"]}>Длительность:</span>
                            </div>
                            <div className={style["popup-order__item"]}>
                                <p className={style["popup-order__item-name"]}>Кол-во человек:</p>
                                <span className={style["popup-order__item-value"]}>{data.numberPerson}</span>
                            </div>
                            <div className={style["popup-order__item"]}>
                                <p className={style["popup-order__item-name"]}>Сумма:</p>
                                <span className={style["popup-order__item-value"]}>{data.payment}</span>
                            </div>
                        </div>
                    </div>

                    <p className={style["popup-order__description"]}>{data.description}</p>
                </div>
            </div>
        </Popup>
    );
};
