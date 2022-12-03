import React, {useRef} from "react";
import "./TripContainer.scss";
import TripMiniCard from "../../../../components/TripMiniCard/TripMiniCard";

import logoWebp from "../../../../../public_html/wp-content/themes/pozitiv/img/logo/logo-big_a1b.webp";
import logoPng from "../../../../../public_html/wp-content/themes/pozitiv/img/logo/logo-big.png";
import {useOnScreen} from "../../../../utils/useOnScreen";
import {useSelector} from "react-redux";

const TripContainer = () => {
    const title = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const isOnScreen = useOnScreen([title], []);

    const [trips] = useSelector(store => [store.tour.tours]);

    // eslint-disable-next-line no-lone-blocks
    {
        /* <section class="our-trip"  #ourTrip>
  <div class="forlink" id="ourTrip"></div>
  <div class="our-trip__header">
    <h2 class="our-trip__title anim__title">Наши поездки</h2>
  </div>

  <div class="loading" *ngIf="!readyForWork">
    <picture class="loading__pulse">
      <source srcset="./assets/images/logo/logo-big_a1b.webp" type="image/webp">
      <img  width="106px" height="106px" src="./assets/images/logo/logo-big.png" alt="логтип positive">
    </picture>

  </div>
  <app-slider [trips]="trips" *ngIf="readyForWork"></app-slider>
</section> */
    }

    return (
        <section id="ourTrip">
            <div className="our-trip__header">
                <h2 className="our-trip__title anim__title" ref={title}>
                    Наши поездки
                </h2>
            </div>
            {trips ? (
                <div>
                    {trips.map((item, index) => (
                        <TripMiniCard data={item} key={index} />
                    ))}
                </div>
            ) : (
                <div className="loading">
                    <picture className="loading__pulse">
                        <source srcSet={logoWebp} type="image/webp" />
                        <img width="106px" height="106px" src={logoPng} alt="логтип positive" />
                    </picture>
                </div>
            )}
        </section>
    );
};

export default TripContainer;
