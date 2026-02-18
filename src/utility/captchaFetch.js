import { createCaptchaFetchHandler } from "waf-captcha-frontend";

export const getCaptchaFetch = () => {
  const keys = {
    JSAPI_URL: process.env.REACT_APP_JSAPI_URL,
    CAPTCHA_TOKEN: process.env.REACT_APP_CAPTCHA_TOKEN,
  };

  if (!keys.CAPTCHA_TOKEN || !keys.JSAPI_URL) {
    console.warn("Captcha configuration is not provided");
    return fetch;
  }

  const captchaFetch = createCaptchaFetchHandler({
    API_KEY: keys.CAPTCHA_TOKEN,
    JSAPI_URL: keys.JSAPI_URL,
    captchaContainerId: "captchaContainer",
  });

  return captchaFetch;
};
