import axios from "axios";

export const sendFeedbackAPI = async ({ name, email, category, feedback, attachmentUrls }) => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      source: "MARKETPLACE",
      name,
      address: "",
      email,
      phone_no: "",
      message_type: category,
      subject: "",
      message: feedback,
      attachment_details: {},
      attachment_urls: attachmentUrls,
    }),
  };
  const feedbackUrl = process?.env?.REACT_APP_FEEDBACK_ENDPOINT;
  if (!feedbackUrl) {
    throw new Error("Cannot start the application! process.env.REACT_APP_FEEDBACK_ENDPOINT is undefined");
  }
  await fetch(feedbackUrl + "/user/message", options);
};

export const FEEDBACK_ATTACHMENTS_FOLDER = process.env.REACT_APP_FEEDBACK_ATTACHMENTS_FOLDER;
const FEEDBACK_AUTH_TOKEN = process.env.REACT_APP_FEEDBACK_AUTH_TOKEN;
const FEEDBACK_BASE_URL = process.env.REACT_APP_FEEDBACK_BASE_URL;

if (!FEEDBACK_ATTACHMENTS_FOLDER || !FEEDBACK_AUTH_TOKEN || !FEEDBACK_BASE_URL) {
  throw new Error(`Cannot start the application. Please check the next process.env variables: 
        process.env.REACT_APP_FEEDBACK_ATTACHMENTS_FOLDER, process.env.REACT_APP_FEEDBACK_AUTH_TOKEN
        process.env.REACT_APP_FEEDBACK_AUTH_TOKEN, 
        process.env.REACT_APP_FEEDBACK_BASE_URL`);
}

export const FeedbackAssetsInstanceS3 = axios.create({
  baseURL: FEEDBACK_BASE_URL,
  headers: {
    Authorization: FEEDBACK_AUTH_TOKEN,
  },
});
