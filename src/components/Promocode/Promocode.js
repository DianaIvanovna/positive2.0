import React from "react";
import "./Promocode.scss";

const Promocode = () => {
    return (
        <form className="promocode">
            <div className="promocode__input">
                <input type="text" placeholder="Введите промокод" name="text1" />

                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1462_2238)">
                        <path
                            d="M9 0C4.0374 0 0 4.03745 0 9.00005C0 13.9627 4.0374 18 9 18C13.9626 18 18 13.9627 18 9.00005C18 4.03745 13.9626 0 9 0ZM9 16.3636C4.93964 16.3636 1.63636 13.0604 1.63636 9.00005C1.63636 4.93974 4.93964 1.63636 9 1.63636C13.0604 1.63636 16.3636 4.93974 16.3636 9.00005C16.3636 13.0604 13.0603 16.3636 9 16.3636Z"
                            fill="#E99A24"
                        />
                        <path
                            d="M9.00085 3.81836C8.39943 3.81836 7.91016 4.30796 7.91016 4.90976C7.91016 5.51101 8.39943 6.00018 9.00085 6.00018C9.60227 6.00018 10.0915 5.51101 10.0915 4.90976C10.0915 4.30796 9.60227 3.81836 9.00085 3.81836Z"
                            fill="#E99A24"
                        />
                        <path
                            d="M8.99982 7.63672C8.54797 7.63672 8.18164 8.00305 8.18164 8.4549V13.364C8.18164 13.8158 8.54797 14.1822 8.99982 14.1822C9.45168 14.1822 9.818 13.8158 9.818 13.364V8.4549C9.818 8.00305 9.45168 7.63672 8.99982 7.63672Z"
                            fill="#E99A24"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_1462_2238">
                            <rect width="18" height="18" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>

            <button className="promocode__button">применить</button>
        </form>
    );
};

export default Promocode;
