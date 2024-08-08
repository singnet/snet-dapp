import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { isEmpty } from "lodash";
import { getAPI } from "../../utility/API";

export const UPDATE_CAROUSEL = "UPDATE_CAROUSEL";

export const fetchCarousel = (carousel) => async (dispatch) => {
  const apiName = APIEndpoints.CONTRACT.name;
  const path = APIPaths.GET_CAROUSEL;
  try {
    if (!isEmpty(carousel)) {
      return;
    }
    const fetchCarouselResponse = await getAPI(apiName, path);
    
    dispatch({ type: UPDATE_CAROUSEL, payload: fetchCarouselResponse.data });
  } catch (error) {
    return;
  }
};
