import axios from "axios";

const DATAFACTORY_S3 = {
  baseUrl: "https://ozx0e68owf.execute-api.us-east-1.amazonaws.com",
  authToken: "IYE2sz0hUSGhWcyLQTwXS0AbiXKq4h1eW85MZSo6uDhtYfXI8dXisTzRyXaBCImH",
};

const TRAINING_S3 = {
  baseUrl: "https://xim5yugo7g.execute-api.us-east-1.amazonaws.com/default",
  authToken: "S1kDjcub9k78JFAyrLPsfS0yQoQ4mgmmpeWKlIoVvYsk6JVq5v4HHKvKQgZ0VdI7",
};

export const TrainingInstanceS3 = axios.create({
  baseURL: TRAINING_S3.baseUrl,
  headers: {
    Authorization: TRAINING_S3.authToken,
  },
});

export const DatafactoryInstanceS3 = axios.create({
  baseURL: DATAFACTORY_S3.baseUrl,
  headers: {
    Authorization: DATAFACTORY_S3.authToken,
  },
});

export const filesToS3Endpoints = {
  UPLOAD: "/upload", // params: key
  DOWNLOAD: "/download", // params: key
};
