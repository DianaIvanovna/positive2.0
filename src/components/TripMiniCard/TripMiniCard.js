import React, {useCallback} from "react";
import "./TripMiniCard.scss";
import {MainButton} from "src/components/MainButton/MainButton";
import {useDispatch} from "react-redux";
import {addTourPage} from "src/store/action/tourAction";
import {useSeasonNavigate} from "src/hooks/useSeasonNavigate";
import {ErrorBoundary} from "src/components/ErrorBoundary";
import {SVG} from "src/components/icons";

const TripMiniCard = ({data, ...props}) => {
    const dispath = useDispatch();
    const navigate = useSeasonNavigate();

    const goTripPage = useCallback(() => {
        dispath(addTourPage(data));
        window.scrollTo({top: 0, behavior: "smooth"});

        navigate(`trip?name=${data.slug}&&id=${data.id}`);
    }, [data, navigate, dispath]);

    return (
        <ErrorBoundary>
            <div className="trip">
                <img src={data.images[0]} alt={data.name} className="trip__img" />
                <h3 className="trip__title">Поездка на Гору{data.name}</h3>

                <div className="trip__date-container">
                    {data.dates.map((item, index) => (
                        <div key={index} className="trip__date">
                            <SVG id="calendar" />
                            {item.dateStart} - {item.dateEnd}
                        </div>
                    ))}
                </div>

                <div className="trip__footer">
                    <MainButton text="ПОДРОБНЕЕ" className="trip__button" classButton="button-mini" onClick={goTripPage} />

                    <div>
                        <p className="trip__price-value">
                            <span>Цена</span> от {data.minCost} ₽
                        </p>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default TripMiniCard;
