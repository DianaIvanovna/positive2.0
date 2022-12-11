import React, {useCallback} from "react";
import {withRouter} from "react-router";
import "./TripMiniCard.scss";
import {MainButton} from "../MainButton/MainButton";
import {useDispatch} from "react-redux";
import {addTourPage} from "../../store/action/tourAction";

const TripMiniCard = ({data, ...props}) => {
    const dispath = useDispatch();

    const goTripPage = useCallback(() => {
        dispath(addTourPage(data));
        window.scrollTo({top: 0, behavior: "smooth"});
        props.history.push(`/trip?id=${data.id}`);
    }, [props.history, data, dispath]);

    return (
        <div className="trip">
            <img src={data.images[0]} alt={data.name} className="trip__img" />
            <h3 className="trip__title">Поездка на Гору{data.name}</h3>

            <div className="trip__footer">
                {/* [routerLink]="['/',trip.linkName]" [queryParams]="{'season':season}" */}
                <MainButton text="ПОДРОБНЕЕ" classButton="button-mini" onClick={goTripPage} />

                <div>
                    <p className="trip__price-value">{data.cost} ₽</p>
                </div>
            </div>
        </div>
    );
};

export default withRouter(TripMiniCard);
