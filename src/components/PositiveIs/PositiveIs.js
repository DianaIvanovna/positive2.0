/* eslint-disable no-unused-vars */
import React, {useRef} from "react";
import "./PositiveIs.scss";

import photo from "../../../public_html/wp-content/themes/pozitiv/img/background/back-positive-is-card_242.webp";
import photo2 from "../../../public_html/wp-content/themes/pozitiv/img/background/back-positive-is-card_10e.png";

import profile from "../../../public_html/wp-content/themes/pozitiv/img/Icon/Profile.svg";
import highFive from "../../../public_html/wp-content/themes/pozitiv/img/Icon/high-five.svg";
import bus from "../../../public_html/wp-content/themes/pozitiv/img/Icon/bus.svg";
import skiGoggles from "../../../public_html/wp-content/themes/pozitiv/img/Icon/ski-goggles.svg";
import backpack from "../../../public_html/wp-content/themes/pozitiv/img/Icon/backpack.svg";
import dinner from "../../../public_html/wp-content/themes/pozitiv/img/Icon/dinner.svg";
import discovery from "../../../public_html/wp-content/themes/pozitiv/img/Icon/Discovery.svg";

import {useOnScreen} from "../../hooks/useOnScreen";

const PositiveIs = ({season}) => {
    const elementRef = useRef(null);
    const isOnScreen = useOnScreen([elementRef]);

    return (
        // <section class="positive-is" #positiveIs>
        <section className="positive-is">
            <div className="forlink" id="positiveIs"></div>
            <div className="positive-is__header">
                <h2 className="positive-is__title anim__title" ref={elementRef}>
                    Почему выбирают нас:
                </h2>
            </div>
            <div className="positive-is__container">
                <div className="advantage positive-is__item">
                    <picture className="advantage__background">
                        <source srcSet={photo} type="image/webp" />
                        <img width="175px" height="200px" src={photo2} alt="фон карточки позитив это" />
                    </picture>
                    <div className="">
                        <img width="64px" height="64px" src={profile} alt="Иконка профиль" className="advantage__icon" />
                        <div className="advantage__text">индивидуальный подход</div>
                    </div>
                </div>
                <div className="advantage positive-is__item">
                    <picture className="advantage__background">
                        <source srcSet={photo} type="image/webp" />
                        <img width="175px" height="200px" src={photo2} alt="фон карточки позитив это" />
                    </picture>
                    <div className="">
                        <img width="64px" height="64px" src={highFive} alt="Иконка компания" className="advantage__icon" />
                        <div className="advantage__text">дружная компания</div>
                    </div>
                </div>
                <div className="advantage positive-is__item">
                    <picture className="advantage__background">
                        <source srcSet={photo} type="image/webp" />
                        <img width="175px" height="200px" src={photo2} alt="фон карточки позитив это" />
                    </picture>
                    <div className="">
                        <img width="64px" height="64px" src={bus} alt="Иконка автобус" className="advantage__icon" />
                        <div className="advantage__text">комфортный безопасный трансфер</div>
                    </div>
                </div>
                <div className="advantage positive-is__item">
                    <picture className="advantage__background">
                        <source srcSet={photo} type="image/webp" />
                        <img width="175px" height="200px" src={photo2} alt="фон карточки позитив это" />
                    </picture>
                    <div className="">
                        <img width="64px" height="64px" src={season === "winter" ? skiGoggles : backpack} alt="Иконка очки" className="advantage__icon" />
                        <div className="advantage__text">{season === "winter" ? "прокат современного снаряжения" : "Качественный прокат оборудования"} </div>
                    </div>
                </div>
                {/* <div class="advantage positive-is__item" *ngIf="season=='summer'">
      <picture class="advantage__background">
        <source srcset={photo} type="image/webp">
        <img width="175px" height="200px"
          src={photo2}
          alt="фон карточки позитив это">
      </picture>
      <div class="">
        <img width="64px" height="64px" src="./assets/images/Icon/backpack.svg" alt="Иконка рюкзак" class="advantage__icon">
        <div class="advantage__text">Качественный прокат оборудования</div>
      </div>
    </div> */}
                <div className="advantage positive-is__item">
                    <picture className="advantage__background">
                        <source srcSet={photo} type="image/webp" />
                        <img width="175px" height="200px" src={photo2} alt="фон карточки позитив это" />
                    </picture>
                    <div className="">
                        <img width="64px" height="64px" src={dinner} alt="Иконка ужин" className="advantage__icon" />
                        <div className="advantage__text">
                            питание в <br />
                            автобусе
                        </div>
                    </div>
                </div>
                <div className="advantage positive-is__item">
                    <picture className="advantage__background">
                        <source srcSet={photo} type="image/webp" />
                        <img width="175px" height="200px" src={photo2} alt="фон карточки позитив это" />
                    </picture>
                    <div className="">
                        <img width="64px" height="64px" src={discovery} alt="Иконка компас" className="advantage__icon" />
                        <div className="advantage__text">большая география путешествий</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PositiveIs;
