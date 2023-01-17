import {useLocation} from "react-router-dom";

export const useLocationSeason = () => {
    const location = useLocation();

    if (location.pathname.includes("summer")) {
        return "summer";
    }

    return "winter";
};
