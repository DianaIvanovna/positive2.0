import React, {useRef} from "react";
import "./ServiceRent.scss";
import {services} from "./data";
import {useOnScreen} from "../../../../hooks/useOnScreen";

const ServiceRent = () => {
    const title = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const isOnScreen = useOnScreen([title]);

    return (
        <>
            <h2 className="sectionTitle sectionTitle_serviceRent anim__title" ref={title}>
                Сервис
            </h2>

            <div className="serviceRent__container">
                {services.map((service, index) => (
                    <div className="serviceRent__service" key={index}>
                        <div>
                            <p className="service__name">{service.name}</p>
                            <p className="service__description">{service.description}</p>
                        </div>
                        <p className="service__price">
                            {service.price} <span className="service__price_active">₽</span>
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ServiceRent;
