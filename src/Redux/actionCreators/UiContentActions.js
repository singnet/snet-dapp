import { get } from "aws-amplify/api";
import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { isEmpty } from "lodash";

export const UPDATE_CAROUSEL = "UPDATE_CAROUSEL";

export const fetchCarousel = (carousel) => async (dispatch) => {
  const apiName = APIEndpoints.CONTRACT.name;
  const path = APIPaths.GET_CAROUSEL;
  try {
    if (!isEmpty(carousel)) {
      return;
    }
    const fetchCarouselRequest = get({ apiName, path });
    const { body } = await fetchCarouselRequest.response;
    const response = await body.json();

    dispatch({ type: UPDATE_CAROUSEL, payload: response.data });
  } catch (error) {
    return;
  }
};
