/* eslint-disable no-unused-vars */
import React, {useEffect, useRef, useState} from "react";
import "./MainPage.scss";
import {withRouter} from "react-router";

import Header from "../../components/Header/Header";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import Preloader from "../../components/Preloader/Preloader";
import PositiveIs from "../../components/PositiveIs/PositiveIs";
import Review from "../../components/Review/Review";
import Photogallery from "../../components/Photogallery/Photogallery";
import Footer from "../../components/Footer/Footer";

import {dataTripSummer, dataTripWinter, dataFooterSummer, dataFooterWinter, dataPositiveIsSummer, dataPositiveIsWinter} from "./data";
import {useOnScreen} from "../../utils/useOnScreen";
import GoUp from "../../components/GoUp/GoUp";

const MainPage = props => {
    const [season, setSeason] = useState(null);
    const [dataWelcomeSection, setDataWelcomeSection] = useState(null);
    const [dataFooter, setDataFooter] = useState(null);
    const [positiveIs, setPositiveIs] = useState(null);

    const lazyImage = useRef(null);
    const lazyImage2 = useRef(null);
    const isOnScreen = useOnScreen([lazyImage, lazyImage2], [dataWelcomeSection, dataFooter]);

    // console.log("lazyImage!", lazyImage);

    useEffect(() => {
        //props.location.pathname
        const query = new URLSearchParams(props.location.search);
        const season = query.get("season");

        setSeason(season);

        if (season === "summer") {
            setDataWelcomeSection(dataTripSummer);
            setDataFooter(dataFooterSummer);
            setPositiveIs(dataPositiveIsSummer);
        } else {
            setDataWelcomeSection(dataTripWinter);
            setDataFooter(dataFooterWinter);
            setPositiveIs(dataPositiveIsWinter);
        }
    }, [props.location]);

    if (!dataWelcomeSection || !dataFooter) {
        return <Preloader />;
    }

    return (
        <div className="main">
            <Header season={season} />
            <div className="main__contant">
                <WelcomeSection data={dataWelcomeSection} />

                <div className="page">
                    <div className="pageContent">
                        <Photogallery season={season} />
                    </div>
                </div>

                <div className="page">
                    <picture className="page__background positive-is__background lazy-image" ref={lazyImage}>
                        <source media="(min-width: 1600px)" data-srcset={positiveIs.photos[0]} type="image/webp" />

                        <source media="(min-width: 1040px)" data-srcset={positiveIs.photos[1]} type="image/webp" />

                        <source media="(min-width: 600px)" data-srcset={positiveIs.photos[2]} type="image/webp" />

                        <source data-srcset={positiveIs.photos[3]} type="image/webp" />

                        <img width="1920px" height="800px" src={positiveIs.photos[4]} data-srcset={positiveIs.photos[4]} srcSet={positiveIs.stub} alt={positiveIs.alt} />
                    </picture>

                    <div className="pageContent">
                        <PositiveIs season={season} />
                        <Review />
                    </div>
                </div>
                {/* footer start  */}
                <div className="page">
                    <div className="pageContent">
                        <Footer season={season} />
                        <picture className={`page__background_footer ${season === "winter" ? "page__background_footer-winter" : ""} lazy-image`} ref={lazyImage2}>
                            <source media="(min-width: 1600px)" data-srcset={dataFooter.photos[0]} type="image/webp" />
                            <source media="(min-width: 1040px)" data-srcset={dataFooter.photos[1]} type="image/webp" />
                            <source media="(min-width: 600px)" data-srcset={dataFooter.photos[2]} type="image/webp" />
                            <source data-srcset={dataFooter.photos[3]} type="image/webp" />
                            <img width="1980px" height="1080px" src={dataFooter.photos[4]} data-srcset={dataFooter.photos[4]} srcSet={dataFooter.stub} alt={dataFooter.alt} />
                        </picture>
                    </div>
                </div>
                {/* footer end  */}
            </div>
            <GoUp />
        </div>
    );
};

export default withRouter(MainPage);
