import React, {useRef} from "react";
import styles from "./TripContainer.module.scss";
import cn from "classnames";
import TripMiniCard from "../../../../components/TripMiniCard/TripMiniCard";

import {useOnScreen} from "../../../../hooks/useOnScreen";
import {useSelector} from "react-redux";
import {Loading} from "../../../../components/Loading/Loading";

const TripContainer = () => {
    const title = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const isOnScreen = useOnScreen([title], []);

    const [tours, tours__loading] = useSelector(store => [store.tour.tours, store.tour.tours__loading]);

    if (tours__loading) {
        return (
            <section id="ourTrip">
                <Loading />
            </section>
        );
    }

    return (
        <section id="ourTrip">
            <div className={styles["our-trip__header"]}>
                <h2 className={cn(styles["our-trip__title"], "anim__title")} ref={title}>
                    Наши поездки
                </h2>
            </div>

            {tours ? (
                <div className={styles["our-trip__container"]}>
                    {tours.map((item, index) => (
                        <TripMiniCard data={item} key={index} />
                    ))}
                </div>
            ) : (
                <p className={styles["our-trip__error"]}>Ошибка загрузки</p>
            )}
        </section>
    );
};

export default TripContainer;
