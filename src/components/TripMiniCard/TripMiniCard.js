import React, {useCallback} from "react";
import "./TripMiniCard.scss";
import {MainButton} from "../MainButton/MainButton";
import {useDispatch} from "react-redux";
import {addTourPage} from "src/store/action/tourAction";
import {useSeasonNavigate} from "src/hooks/useSeasonNavigate";
import {ErrorBoundary} from "../ErrorBoundary";

const TripMiniCard = ({data, ...props}) => {
    const dispath = useDispatch();
    const navigate = useSeasonNavigate();

    const goTripPage = useCallback(() => {
        dispath(addTourPage(data));
        window.scrollTo({top: 0, behavior: "smooth"});

        navigate(`trip?id=${data.id}`);
    }, [data, navigate, dispath]);

    return (
        <ErrorBoundary>
            <div className="trip">
                <img src={data.images[0]} alt={data.name} className="trip__img" />
                <h3 className="trip__title">Поездка на Гору{data.name}</h3>

                <div className="trip__footer">
                    <MainButton text="ПОДРОБНЕЕ" classButton="button-mini" onClick={goTripPage} />

                    <div>
                        <p className="trip__price-value">{data.cost} ₽</p>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default TripMiniCard;
