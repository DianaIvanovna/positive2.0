/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from "react";
import "./Photogallery.scss";
import {photosWinter} from "./winter";
import {photosSummer} from "./summer";
import closeSvg from "../../../public_html/wp-content/themes/pozitiv/img/Icon/close.svg";
import {useOnScreen} from "../../hooks/useOnScreen";

const Photogallery = ({season}) => {
    const [photos, setPhotos] = useState([]);
    const [photosActive, setPhotosActive] = useState([]);
    const [photoPages, setPhotoPages] = useState(0);
    const [photoPagesActive, setPhotoPagesActive] = useState(0);

    const [readyForWork, setReadyForWork] = useState(false);
    const [activeButtonLeft, setActiveButtonLeft] = useState(false);
    const [activeButtonRight, setActiveButtonRight] = useState(true);

    const elementRef = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const isOnScreen = useOnScreen([elementRef], [readyForWork]);

    const [bigPhoto, setBigPhoto] = useState({
        photoWebp: "",
        photo: "",
        description: "",
        index: undefined,
    });
    const [activeButtonBigPhotoLeft, setActiveButtonBigPhotoLeft] = useState(false);
    const [activeButtonBigPhotoRight, setActiveButtonBigPhotoRight] = useState(true);

    useEffect(() => {
        let photos = photosSummer;

        if (season === "winter") {
            photos = photosWinter;
        }

        setPhotos(photos);
        setPhotosActive(photos.slice(photoPagesActive, photoPagesActive + 8));
        setPhotoPages(photos.length);
        setReadyForWork(true);
    }, []);

    const next = event => {
        event.preventDefault();

        let active = photoPagesActive;

        if (photoPagesActive !== photoPages - 8) {
            active = active + 8;
            setPhotoPagesActive(active);
            setActiveButtonLeft(true);
            setPhotosActive(photos.slice(active, active + 8));
        }

        if (active === photoPages - 8) {
            setActiveButtonRight(false);
        }
    };
    const previous = event => {
        event.preventDefault();

        let active = photoPagesActive;

        if (photoPagesActive !== 0) {
            active = active - 8;
            setPhotoPagesActive(active);
            setActiveButtonRight(true);
            setPhotosActive(photos.slice(active, active + 8));
        }

        if (active === 0) {
            setActiveButtonLeft(false);
        }
    };

    const openBigPhoto = (photo, index) => {
        setBigPhoto({
            photoWebp: photo.photoBigWebp,
            photo: photo.photo,
            description: photo.description,
            index,
        });

        setActiveButtonBigPhotoLeft(true);
        setActiveButtonBigPhotoRight(true);

        if (index === 0) {
            setActiveButtonBigPhotoLeft(false);
        } else if (index === photosActive.length - 1) {
            setActiveButtonBigPhotoRight(false);
        }
    };

    const previousBigPhoto = event => {
        event.preventDefault();

        const newIndex = bigPhoto.index - 1;

        if (bigPhoto.index !== 0) {
            setActiveButtonBigPhotoRight(true);

            setBigPhoto({
                photoWebp: photosActive[newIndex].photoBigWebp,
                photo: photosActive[newIndex].photo,
                description: photosActive[newIndex].description,
                index: newIndex,
            });
        }

        if (newIndex === 0) {
            setActiveButtonBigPhotoLeft(false);
        }
    };
    const nextBigPhoto = event => {
        event.preventDefault();

        const newIndex = bigPhoto.index + 1;

        if (bigPhoto.index !== photosActive.length - 1) {
            setActiveButtonBigPhotoLeft(true);
            setBigPhoto({
                photoWebp: photosActive[newIndex].photoBigWebp,
                photo: photosActive[newIndex].photo,
                description: photosActive[newIndex].description,
                index: newIndex,
            });
        }

        if (newIndex === photosActive.length - 1) {
            setActiveButtonBigPhotoRight(false);
        }
    };
    const closePopup = event => {
        if (event.target.classList.contains("popup")) {
            setBigPhoto({
                photoWebp: "",
                photo: "",
                description: "",
                index: undefined,
            });
        }
    };

    if (!readyForWork) {
        return null;
    }

    return (
        <section className="photogallery">
            <div className="forlink" id="photogallery"></div>
            <div className="photogallery__header">
                <h2 className="photogallery__title anim__title" ref={elementRef}>
                    Фотогалерея
                </h2>
            </div>
            <div className="photogallery__grid">
                {photosActive.map((item, i) => (
                    <picture
                        key={i}
                        className={`grid__item item-${i + 1}`}
                        onClick={() => {
                            openBigPhoto(item, i);
                        }}
                    >
                        <source srcSet={item.photoWebp} type="image/webp" />
                        <source media="(min-width: 500px)" srcSet={item.photoSmall} type="image/webp" />
                        <img width="720px" height="720px" src={item.photo} alt="фото горнолыжныу туры" />
                    </picture>
                ))}
            </div>

            <div className="photogallery__footer">
                <p className="photogallery__ps">Любуйтесь и радуйтесь пейзажами из нашей галлереи</p>
                <div>
                    <svg
                        width="37"
                        height="37"
                        viewBox="0 0 37 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={previous}
                        className={`photogallery__arrow ${activeButtonLeft ? "photogallery__button_active" : ""}`}
                        disabled={!activeButtonLeft}
                        alt="стрелка влево"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M25.0612 29.8112C25.5616 29.326 25.5651 28.5395 25.0578 28.0544L17.5569 20.8652L17.4244 20.7544C16.9174 20.3854 16.1927 20.4239 15.7324 20.8702C15.4831 21.1119 15.3558 21.4298 15.3558 21.746C15.3558 22.064 15.4831 22.3835 15.7358 22.6252L23.2367 29.8161L23.3692 29.9269C23.8762 30.296 24.6009 30.2574 25.0612 29.8112ZM25.1741 8.02985C25.5612 7.54295 25.52 6.84503 25.0613 6.40033C24.5592 5.91519 23.7424 5.91354 23.2368 6.39867L11.9425 17.2272L11.8266 17.3541C11.6509 17.575 11.5625 17.8401 11.5625 18.1064C11.5625 18.4226 11.6897 18.7406 11.9391 18.9823C12.4412 19.4691 13.258 19.4707 13.7636 18.9856L25.0579 8.15706L25.1741 8.02985Z"
                            fill="#808080"
                        />
                    </svg>

                    <svg
                        width="37"
                        onClick={next}
                        className={`photogallery__arrow ${activeButtonRight ? "photogallery__button_active" : ""}`}
                        disabled={!activeButtonRight}
                        height="37"
                        viewBox="0 0 37 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        alt="стрелка вправо"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.9388 6.40174C11.4384 6.88687 11.4349 7.67334 11.9422 8.15848L19.4431 15.3477L19.5756 15.4585C20.0826 15.8275 20.8073 15.7889 21.2676 15.3427C21.5169 15.101 21.6442 14.7831 21.6442 14.4668C21.6442 14.1489 21.5169 13.8294 21.2642 13.5876L13.7633 6.39677L13.6308 6.28601C13.1238 5.91694 12.3991 5.95552 11.9388 6.40174ZM11.8259 28.183C11.4388 28.6699 11.48 29.3679 11.9387 29.8126C12.4408 30.2977 13.2576 30.2994 13.7632 29.8142L25.0575 18.9857L25.1734 18.8588C25.3491 18.6379 25.4375 18.3728 25.4375 18.1065C25.4375 17.7902 25.3102 17.4723 25.0609 17.2306C24.5588 16.7438 23.742 16.7422 23.2364 17.2273L11.9421 28.0558L11.8259 28.183Z"
                            fill="#808080"
                        />
                    </svg>
                </div>
            </div>

            {/* <!-- ПОПАП ДЛЯ БОЛЬШОГО ФОТО --> */}
            <div className={`popup popup_image ${bigPhoto.photo ? "popup_is-opened" : ""}`} onClick={closePopup}>
                <div className="popup__content">
                    <img
                        width="26px"
                        height="26px"
                        src={closeSvg}
                        alt="иконка закрытия"
                        onClick={() => {
                            setBigPhoto({
                                photoWebp: "",
                                photo: "",
                                description: "",
                                index: undefined,
                            });
                        }}
                        className="popup__close popup__close_image"
                    />

                    <div>
                        <picture className="popup__image">
                            <source srcSet={bigPhoto.photoWebp} type="image/webp" />
                            <img width="720px" height="720px" src={bigPhoto.photo} alt="фото горнолыжныу туры" />
                        </picture>
                    </div>
                </div>
                <div className="popup__footer">
                    <div>
                        <svg
                            width="37"
                            height="37"
                            viewBox="0 0 37 37"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`popup__arrow ${activeButtonBigPhotoLeft ? "photogallery__button_active" : ""}`}
                            onClick={previousBigPhoto}
                            disabled={!activeButtonBigPhotoLeft}
                            alt="стрелка влево"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M25.0612 29.8112C25.5616 29.326 25.5651 28.5395 25.0578 28.0544L17.5569 20.8652L17.4244 20.7544C16.9174 20.3854 16.1927 20.4239 15.7324 20.8702C15.4831 21.1119 15.3558 21.4298 15.3558 21.746C15.3558 22.064 15.4831 22.3835 15.7358 22.6252L23.2367 29.8161L23.3692 29.9269C23.8762 30.296 24.6009 30.2574 25.0612 29.8112ZM25.1741 8.02985C25.5612 7.54295 25.52 6.84503 25.0613 6.40033C24.5592 5.91519 23.7424 5.91354 23.2368 6.39867L11.9425 17.2272L11.8266 17.3541C11.6509 17.575 11.5625 17.8401 11.5625 18.1064C11.5625 18.4226 11.6897 18.7406 11.9391 18.9823C12.4412 19.4691 13.258 19.4707 13.7636 18.9856L25.0579 8.15706L25.1741 8.02985Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                    <p className="popup__description">{bigPhoto.description}</p>
                    <div>
                        <svg
                            width="37"
                            height="37"
                            viewBox="0 0 37 37"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`popup__arrow ${activeButtonBigPhotoRight ? "photogallery__button_active" : ""}`}
                            onClick={nextBigPhoto}
                            disabled={!activeButtonBigPhotoRight}
                            alt="стрелка вправо"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.9388 6.40174C11.4384 6.88687 11.4349 7.67334 11.9422 8.15848L19.4431 15.3477L19.5756 15.4585C20.0826 15.8275 20.8073 15.7889 21.2676 15.3427C21.5169 15.101 21.6442 14.7831 21.6442 14.4668C21.6442 14.1489 21.5169 13.8294 21.2642 13.5876L13.7633 6.39677L13.6308 6.28601C13.1238 5.91694 12.3991 5.95552 11.9388 6.40174ZM11.8259 28.183C11.4388 28.6699 11.48 29.3679 11.9387 29.8126C12.4408 30.2977 13.2576 30.2994 13.7632 29.8142L25.0575 18.9857L25.1734 18.8588C25.3491 18.6379 25.4375 18.3728 25.4375 18.1065C25.4375 17.7902 25.3102 17.4723 25.0609 17.2306C24.5588 16.7438 23.742 16.7422 23.2364 17.2273L11.9421 28.0558L11.8259 28.183Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* </div> */}
        </section>
    );
};

export default Photogallery;
