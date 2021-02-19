import API from "@aws-amplify/api";
import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";

export const UPDATE_CAROUSEL = "UPDATE_CAROUSEL";

export const fetchCarousel = () => async dispatch => {
  const response = await fetchCarouselAPI();
  dispatch({ type: UPDATE_CAROUSEL, payload: response.data });
};

const fetchCarouselAPI = () => {
  const apiName = APIEndpoints.CONTRACT.name;
  const path = APIPaths.GET_CAROUSEL;
  return API.get(apiName, path);
};
