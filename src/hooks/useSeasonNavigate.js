import {useNavigate} from "react-router-dom";
import {useLocationSeason} from "./useLocationSeason";

export const useSeasonNavigate = () => {
    const season = useLocationSeason();
    const navigate = useNavigate();

    return (link, noSeason = false) => {
        if (noSeason) {
            navigate(`/${link}`);
        } else {
            navigate(`/${season}/${link}`);
        }
    };
};
