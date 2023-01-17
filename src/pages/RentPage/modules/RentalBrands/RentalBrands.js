import React, {useRef} from "react";
import "./RentalBrands.scss";

import photo1 from "../../../../../public_html/wp-content/themes/pozitiv/img/brand/roxy.png";
import photo2 from "../../../../../public_html/wp-content/themes/pozitiv/img/brand/salomon1.png";
import photo3 from "../../../../../public_html/wp-content/themes/pozitiv/img/brand/burton1.png";
import photo4 from "../../../../../public_html/wp-content/themes/pozitiv/img/brand/head1.png";
import photo5 from "../../../../../public_html/wp-content/themes/pozitiv/img/brand/atomic1.png";
import {useOnScreen} from "../../../../hooks/useOnScreen";

const RentalBrands = () => {
    const title = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const isOnScreen = useOnScreen([title]);

    return (
        <section className="rental-brands">
            <h2 className="rental-brands__title sectionTitle anim__title" ref={title}>
                бренды нашего проката
            </h2>
            <div className="rental-brands__container">
                <img width="144px" height="156px" src={photo1} className="rental-brands__img" alt="иконка бренда" />
                <img width="144px" height="156px" src={photo2} className="rental-brands__img" alt="иконка бренда" />
                <img width="144px" height="156px" src={photo3} className="rental-brands__img " alt="иконка бренда" />
                <img width="144px" height="156px" src={photo4} className="rental-brands__img" alt="иконка бренда" />
                <img width="144px" height="156px" src={photo5} className="rental-brands__img" alt="иконка бренда" />
            </div>

            <div className="rental-brands__container rental-brands__container_mobile">
                <div className="rental-brands__class">
                    <img width="120px" height="136px" src={photo1} className="rental-brands__img" alt="иконка бренда" />
                    <img width="120px" height="136px" src={photo2} className="rental-brands__img" alt="иконка бренда" />
                </div>
                <img width="120px" height="136px" src={photo3} className="rental-brands__img" alt="иконка бренда" />
                <div className="rental-brands__class">
                    <img width="120px" height="136px" src={photo4} className="rental-brands__img" alt="иконка бренда" />
                    <img width="120px" height="136px" src={photo5} className="rental-brands__img" alt="иконка бренда" />
                </div>
            </div>
        </section>
    );
};

export default RentalBrands;
