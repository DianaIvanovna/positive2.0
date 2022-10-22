import React, {useEffect, useState} from "react";
import "./GoUp.scss";

const GoUp = () => {
    const [showButtonUp, setShowButtonUp] = useState(false);

    useEffect(() => {
        const scrollHandler = () => {
            const scrolled = window.pageYOffset;

            if (scrolled > 500) {
                setShowButtonUp(true);
            } else {
                setShowButtonUp(false);
            }
        };

        window.addEventListener("scroll", scrollHandler);

        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    const scrollUp = event => {
        event.preventDefault();
        window.scroll({
            left: 0,
            top: 0,
            behavior: "smooth",
        });
    };

    if (showButtonUp) {
        return (
            <div className="goUp" onClick={scrollUp}>
                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg" alt="стрелка вверх">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.9388 6.40174C11.4384 6.88687 11.4349 7.67334 11.9422 8.15848L19.4431 15.3477L19.5756 15.4585C20.0826 15.8275 20.8073 15.7889 21.2676 15.3427C21.5169 15.101 21.6442 14.7831 21.6442 14.4668C21.6442 14.1489 21.5169 13.8294 21.2642 13.5876L13.7633 6.39677L13.6308 6.28601C13.1238 5.91694 12.3991 5.95552 11.9388 6.40174ZM11.8259 28.183C11.4388 28.6699 11.48 29.3679 11.9387 29.8126C12.4408 30.2977 13.2576 30.2994 13.7632 29.8142L25.0575 18.9857L25.1734 18.8588C25.3491 18.6379 25.4375 18.3728 25.4375 18.1065C25.4375 17.7902 25.3102 17.4723 25.0609 17.2306C24.5588 16.7438 23.742 16.7422 23.2364 17.2273L11.9421 28.0558L11.8259 28.183Z"
                        fill="white"
                    />
                </svg>
            </div>
        );
    }

    return null;
};

export default GoUp;
