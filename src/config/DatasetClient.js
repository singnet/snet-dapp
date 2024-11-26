import axios from "axios";

export const DatasetClient = axios.create({
  baseURL: "https://datafactory.singularitynet.io",
  headers: {
    Authorization: "jzWEbCCJ1434P2mSm3e9Ugs5u387yAf1bv1DCapfomLLg6V57Ht6BjXvFMa9260a",
  },
});

export const endpoints = {
  VALIDATE_AND_ANALIZE: "/api/get-stat",
  IMPROVE: "/api/post-improve-dataset",
  VALIDATE_MERGE: "api/post-validate-merge",
  MERGE: "/api/post-merge-dataset",
};
