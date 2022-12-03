import React from "react";
import "./TripMiniCard.scss";
import photo from "../../../../photo.png";

const TripMiniCard = ({data}) => {
    return (
        <div className="trip">
            <img src={photo} alt="фото" className="trip__img" />
            <p className="trip__title">Поездка на Гору{data.services[0].name}</p>

            <div className="trip__footer">
                {/* [routerLink]="['/',trip.linkName]" [queryParams]="{'season':season}" */}
                <button className="trip__button">ПОДРОБНЕЕ</button>
                <div>
                    <p className="trip__price-value">{data.cost} ₽</p>
                </div>
            </div>
        </div>
    );
};

export default TripMiniCard;
