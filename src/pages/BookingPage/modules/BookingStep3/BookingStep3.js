import React from "react";
import "./BookingStep3.scss";
import Promocode from "../../../../components/Promocode/Promocode";
import BonusContainer from "../../../../components/BonusContainer/BonusContainer";

import photo from "../../../../../../photo.png";

const BookingStep3 = () => {
    return (
        <section>
            <div className="booking-step-3">
                <div className="booking-step-3__block-left">
                    <div className="booking-step-3__header">
                        <p className="booking-step-3__name">Сплав по реке Ай</p>
                        <p className="booking-step-3__date">28.08.2022-29.08.2022</p>
                    </div>
                    <div className="booking-step-3__item-container">
                        <div className="booking-step-3__item">
                            <p className="booking-step-3__tariff">Сплав + Пати</p>
                            <p className="booking-step-3__description">С трансфером, размещение в трехместной палатке</p>
                            <svg className="booking-step-3__icon-delete" width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.0625 1.6875H10.125V0.5625C10.125 0.252 9.87356 0 9.5625 0H5.0625C4.752 0 4.5 0.252 4.5 0.5625V1.6875H0.5625C0.252 1.6875 0 1.9395 0 2.25V3.9375C0 4.248 0.252 4.5 0.5625 4.5H1.125V14.625C1.125 15.8659 2.13412 16.875 3.375 16.875H11.25C12.4909 16.875 13.5 15.8659 13.5 14.625V4.5H14.0625C14.3736 4.5 14.625 4.248 14.625 3.9375V2.25C14.625 1.9395 14.3736 1.6875 14.0625 1.6875ZM5.625 1.125H9V1.6875H5.625V1.125ZM12.375 14.625C12.375 15.2454 11.8704 15.75 11.25 15.75H3.375C2.75456 15.75 2.25 15.2454 2.25 14.625V4.5H12.375V14.625ZM13.5 3.375H1.125V2.8125H5.0625H9.5625H13.5V3.375ZM6.75 14.0625V6.1875C6.75 5.877 7.002 5.625 7.3125 5.625C7.623 5.625 7.875 5.877 7.875 6.1875V14.0625C7.875 14.373 7.623 14.625 7.3125 14.625C7.002 14.625 6.75 14.373 6.75 14.0625ZM3.9375 14.0625V6.1875C3.9375 5.877 4.1895 5.625 4.5 5.625C4.8105 5.625 5.0625 5.877 5.0625 6.1875V14.0625C5.0625 14.373 4.8105 14.625 4.5 14.625C4.1895 14.625 3.9375 14.373 3.9375 14.0625ZM9.5625 14.0625V6.1875C9.5625 5.877 9.81394 5.625 10.125 5.625C10.4361 5.625 10.6875 5.877 10.6875 6.1875V14.0625C10.6875 14.373 10.4361 14.625 10.125 14.625C9.81394 14.625 9.5625 14.373 9.5625 14.0625Z"
                                    fill="#8D8D8D"
                                />
                            </svg>
                        </div>
                        <div className="booking-step-3__item">
                            <p className="booking-step-3__tariff">Сплав + Пати</p>
                            <p className="booking-step-3__description">С трансфером, размещение в трехместной палатке</p>
                            <svg className="booking-step-3__icon-delete" width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.0625 1.6875H10.125V0.5625C10.125 0.252 9.87356 0 9.5625 0H5.0625C4.752 0 4.5 0.252 4.5 0.5625V1.6875H0.5625C0.252 1.6875 0 1.9395 0 2.25V3.9375C0 4.248 0.252 4.5 0.5625 4.5H1.125V14.625C1.125 15.8659 2.13412 16.875 3.375 16.875H11.25C12.4909 16.875 13.5 15.8659 13.5 14.625V4.5H14.0625C14.3736 4.5 14.625 4.248 14.625 3.9375V2.25C14.625 1.9395 14.3736 1.6875 14.0625 1.6875ZM5.625 1.125H9V1.6875H5.625V1.125ZM12.375 14.625C12.375 15.2454 11.8704 15.75 11.25 15.75H3.375C2.75456 15.75 2.25 15.2454 2.25 14.625V4.5H12.375V14.625ZM13.5 3.375H1.125V2.8125H5.0625H9.5625H13.5V3.375ZM6.75 14.0625V6.1875C6.75 5.877 7.002 5.625 7.3125 5.625C7.623 5.625 7.875 5.877 7.875 6.1875V14.0625C7.875 14.373 7.623 14.625 7.3125 14.625C7.002 14.625 6.75 14.373 6.75 14.0625ZM3.9375 14.0625V6.1875C3.9375 5.877 4.1895 5.625 4.5 5.625C4.8105 5.625 5.0625 5.877 5.0625 6.1875V14.0625C5.0625 14.373 4.8105 14.625 4.5 14.625C4.1895 14.625 3.9375 14.373 3.9375 14.0625ZM9.5625 14.0625V6.1875C9.5625 5.877 9.81394 5.625 10.125 5.625C10.4361 5.625 10.6875 5.877 10.6875 6.1875V14.0625C10.6875 14.373 10.4361 14.625 10.125 14.625C9.81394 14.625 9.5625 14.373 9.5625 14.0625Z"
                                    fill="#8D8D8D"
                                />
                            </svg>
                        </div>
                    </div>
                    <p className="booking-step-3__people">
                        Кол-во человек: <span>2</span>
                    </p>

                    <div className="booking-step-3__score">
                        <div className="booking-step-3__amount-container">
                            <p className="booking-step-3__amount">Сумма</p>
                            <p className="booking-step-3__sum">
                                11 000 <span>₽</span>
                            </p>
                        </div>
                        <div className="booking-step-3__amount-container">
                            <p className="booking-step-3__amount">Предоплата</p>
                            <p className="booking-step-3__sum">
                                6 000 <span>₽</span>
                            </p>
                        </div>
                    </div>
                    <BonusContainer />
                    <Promocode />
                </div>

                <div className="booking-step-3__block-right">
                    <img src={photo} alt="фото поездки" className="booking-step-3__img" />
                    <div className="button__background booking-step-3__button">
                        <button
                            className="button"
                            //(click)="scrollToBook($event, data.link)"
                        >
                            завершить заказ
                        </button>
                    </div>
                </div>

                {/* <div className="button__background booking-step-1__button">
                    <button
                        className="button"
                        disabled={!active}
                        //(click)="scrollToBook($event, data.link)"
                    >
                        Продолжить
                    </button>
                </div> */}
            </div>
        </section>
    );
};

export default BookingStep3;
