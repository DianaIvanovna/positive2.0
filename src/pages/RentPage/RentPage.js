import React, {useEffect, useRef, useState} from "react";
import "./RentPage.scss";
import Header from "../../components/Header/Header";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import Preloader from "../../components/Preloader/Preloader";
import Footer from "../../components/Footer/Footer";
import GoUp from "../../components/GoUp/GoUp";

import {dataTripSummer, dataRentWinter, dataFooterSummer, dataFooterWinter, dataBlockWinter, dataBlock2Winter, dataBlockSummer, dataBlock2Summer} from "./data";

import {useOnScreen} from "../../hooks/useOnScreen";
import RentalBrands from "./modules/RentalBrands/RentalBrands";
import ServiceRent from "./modules/ServiceRent/ServiceRent";
import RentContainer from "./modules/RentContainer/RentContainer";
import {useLocationSeason} from "../../hooks/useLocationSeason";

export const RentPage = props => {
    const season = useLocationSeason();
    const [dataWelcomeSection, setDataWelcomeSection] = useState(null);
    const [dataFooter, setDataFooter] = useState(null);

    const lazyImage1 = useRef(null);
    const lazyImage2 = useRef(null);
    const lazyImage3 = useRef(null);
    const lazyImage4 = useRef(null);
    const lazyImage5 = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const isOnScreen = useOnScreen([lazyImage1, lazyImage2, lazyImage3, lazyImage4, lazyImage5], [dataWelcomeSection, dataFooter]);

    useEffect(() => {
        if (season === "summer") {
            setDataWelcomeSection(dataTripSummer);
            setDataFooter(dataFooterSummer);
        } else {
            setDataWelcomeSection(dataRentWinter);
            setDataFooter(dataFooterWinter);
        }
    }, [season]);

    if (!dataWelcomeSection || !dataFooter) {
        return <Preloader />;
    }

    return (
        <div className="main main_rent">
            <Header season={season} />

            <div className="main__contant">
                <WelcomeSection data={dataWelcomeSection} />

                <div className="page page_rent">
                    {season === "winter" ? (
                        <div className="equipmentRental__background-container">
                            <picture className="lazy-image " ref={lazyImage1}>
                                <source media="(min-width: 1600px)" data-srcset={dataBlockWinter.photos[0]} type="image/webp" />

                                <source media="(min-width: 900px)" data-srcset={dataBlockWinter.photos[1]} type="image/webp" />

                                <source data-srcset={dataBlockWinter.photos[2]} type="image/webp" />

                                <img width="1980px" height="800px" src={dataBlockWinter.photos[3]} data-srcset={dataBlockWinter.photos[3]} srcSet={dataBlockWinter.slug} alt={dataBlockWinter.alt} />
                            </picture>
                        </div>
                    ) : null}

                    {season === "summer" ? (
                        <div className="equipmentRental__background-container_summer">
                            <picture className="lazy-image equipmentRental__back-img" ref={lazyImage2}>
                                <source media="(min-width: 1600px)" data-srcset={dataBlockSummer.photos[0]} type="image/webp" />

                                <source media="(min-width: 900px)" data-srcset={dataBlockSummer.photos[1]} type="image/webp" />

                                <source data-srcset={dataBlockSummer.photos[2]} type="image/webp" />

                                <img width="1980px" height="800px" src={dataBlockSummer.photos[3]} data-srcset={dataBlockSummer.photos[3]} srcSet={dataBlockSummer.slug} alt={dataBlockSummer.alt} />
                            </picture>
                            <picture className="lazy-image " ref={lazyImage3}>
                                <source media="(min-width: 1600px)" data-srcset={dataBlock2Summer.photos[0]} type="image/webp" />

                                <source media="(min-width: 900px)" data-srcset={dataBlock2Summer.photos[1]} type="image/webp" />

                                <source data-srcset={dataBlock2Summer.photos[2]} type="image/webp" />

                                <img
                                    width="1980px"
                                    height="800px"
                                    src={dataBlock2Summer.photos[3]}
                                    data-srcset={dataBlock2Summer.photos[3]}
                                    srcSet={dataBlock2Summer.slug}
                                    alt={dataBlock2Summer.alt}
                                />
                            </picture>
                        </div>
                    ) : null}

                    <div className="pageContent">
                        {season === "winter" ? <RentalBrands /> : null}
                        <RentContainer season={season} />
                        {/* 
        <app-equipment-container [equipmentSmall]="equipmentSmall" ></app-equipment-container> */}

                        {season === "winter" ? (
                            <picture className="lazy-image equipmentContainer__img" ref={lazyImage4}>
                                <source data-srcset={dataBlock2Winter.photos[0]} type="image/webp" />

                                <img width="700px" height="560px" src={dataBlock2Winter.photos[1]} data-srcset={dataBlock2Winter.photos[1]} srcSet={dataBlock2Winter.slug} alt={dataBlock2Winter.alt} />
                            </picture>
                        ) : null}
                    </div>
                </div>
                {season === "winter" ? (
                    <div className="page">
                        <div className="pageContent">
                            <ServiceRent />
                        </div>
                    </div>
                ) : null}
                {/*  */}

                {/* <!-- content end --> */}
            </div>
            <div className="main-second">
                {/* <!-- footer start --> */}
                <div className="page">
                    <div className="pageContent">
                        <Footer season={season} />
                        <picture className={`page__background_footer ${season === "winter" ? "page__background_footer-winter" : ""} lazy-image`} ref={lazyImage5}>
                            <source media="(min-width: 1600px)" data-srcset={dataFooter.photos[0]} type="image/webp" />
                            <source media="(min-width: 1040px)" data-srcset={dataFooter.photos[1]} type="image/webp" />
                            <source media="(min-width: 600px)" data-srcset={dataFooter.photos[2]} type="image/webp" />
                            <source data-srcset={dataFooter.photos[3]} type="image/webp" />
                            <img width="1980px" height="1080px" src={dataFooter.photos[4]} data-srcset={dataFooter.photos[4]} srcSet={dataFooter.stub} alt={dataFooter.alt} />
                        </picture>
                    </div>
                </div>
                {/* <!-- footer end --> */}
            </div>
            {/* <!-- кнопка вверх --> */}
            <GoUp />
        </div>
    );
};
