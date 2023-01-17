/* eslint-disable no-console */
import {useEffect, useState, useRef} from "react";

export function useOnScreen(items, triggers = []) {
    // eslint-disable-next-line no-unused-vars
    const [isOnScreen, setIsOnScreen] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries, imgObserver) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setIsOnScreen(entry.isIntersecting);

                    if (entry.target.classList.contains("anim__title")) {
                        // анимация заголовка
                        entry.target.classList.add("anim__title_active");
                        imgObserver.unobserve(entry.target);
                    } else {
                        const lazyPicture = entry.target;
                        const lazyImage = lazyPicture.getElementsByTagName("img");
                        const sourseLazyImage = lazyPicture.getElementsByTagName("source");

                        Array.from(sourseLazyImage).forEach(item => {
                            item.setAttribute("srcset", item.getAttribute("data-srcset"));
                        });
                        lazyImage[0].setAttribute("srcset", lazyImage[0].getAttribute("data-srcset"));
                        lazyPicture.classList.remove("lazy-image");
                        imgObserver.unobserve(lazyPicture);
                    }
                }
            });
        });
    }, []);

    useEffect(() => {
        if (items) {
            items.forEach(item => {
                if (item.current) {
                    observerRef.current.observe(item.current);
                }
            });
        }

        return () => {
            observerRef.current.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, ...triggers]);

    return isOnScreen;
}
