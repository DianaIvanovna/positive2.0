import {useNavigate} from "react-router-dom";
import {useLocationSeason} from "./useLocationSeason";

export const useSeasonNavigate = () => {
    const season = useLocationSeason();
    const navigate = useNavigate();

    return link => {
        navigate(`/${season}/${link}`);
    };
};
