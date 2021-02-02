// import { API } from "aws-amplify";
// import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
// import { initializeAPIOptions } from "../../utility/API";
// import { userActions } from "./";

export const UPDATE_CAROUSEL = "UPDATE_CAROUSEL";

export const fetchCarousel = dispatch => {
  // export const fetchCarousel = async dispatch => {
  // const { token } = await userActions.fetchAuthenticatedUser();
  // const response = await userActions.fetchCarouselAPI(token);
  const response = [
    {
      id: 1,
      image: "https://d16o4vcu292x9v.cloudfront.net/assets/snet/minecraftizing-service/hero.jpeg",
      alt_text: "alternate text",
      image_alignment: "LEFT",
      title: "Song/Splitter is the first mobile app to leverage SingularityNET AI services.",
      description: "dflkajflajsdflkj",
      cta: [
        { id: 1, text: "abc", url: "www.google.com", type: "blue", variant: "contained" },
        { id: 2, text: "abc", url: "www.google.com", type: "whiteBorder", variant: "text" },
      ],
    },
    {
      id: 2,
      image: "https://d16o4vcu292x9v.cloudfront.net/assets/snet/minecraftizing-service/hero.jpeg",
      alt_text: "alternate text",
      image_alignment: "RIGHT",
      title: "ABC",
      description: "dflkajflajsdflkj",
      cta: [
        { id: 3, text: "abc", url: "www.google.com", type: "blue", variant: "contained" },
        { id: 4, text: "abc", url: "www.google.com", type: "whiteBorder", variant: "outlined" },
      ],
    },
    {
      id: 3,
      image: "https://d16o4vcu292x9v.cloudfront.net/assets/snet/minecraftizing-service/hero.jpeg",
      alt_text: "alternate text",
      image_alignment: "LEFT",
      title: "XYZ",
      description: "dflkajflajsdflkj",
      cta: [
        { id: 5, text: "abc", url: "www.google.com", type: "blue", variant: "contained" },
        { id: 6, text: "abc", url: "www.google.com", type: "whiteBorder", variant: "text" },
      ],
    },
  ];
  dispatch({ type: UPDATE_CAROUSEL, payload: response });
};

// const fetchCarouselAPI = token => {
//   const apiName = APIEndpoints.UI_CONTENT.name;
//   const path = APIPaths.GET_CAROUSEL;
//   const apiOptions = initializeAPIOptions(token);
//   return API.get(apiName, path, apiOptions);
// };
