export const WAF_SCRIPT_ID = "AwsWAFScript";

export function checkWAFEnv() {
  const errors = [];
  if (!process.env.REACT_APP_CAPTCHA_TOKEN) {
    errors.push("REACT_APP_CAPTCHA_TOKEN is not set");
  }
  if (!process.env.REACT_APP_JSAPI_URL) {
    errors.push("REACT_APP_JSAPI_URL is not set");
  }
  return { isValid: errors.length === 0, errors };
}

export function getWAFEnv() {
  return {
    JSAPI_URL: process.env.REACT_APP_JSAPI_URL,
    CAPTCHA_TOKEN: process.env.REACT_APP_CAPTCHA_TOKEN,
  };
}

export function loadCaptchaScript() {
  const JSAPI_URL = getWAFEnv().JSAPI_URL;
  if (document.getElementById(WAF_SCRIPT_ID) || !JSAPI_URL) return;
  const AwsWafScript = document.createElement("script");
  AwsWafScript.id = WAF_SCRIPT_ID;
  AwsWafScript.async = false;
  AwsWafScript.src = JSAPI_URL;
  document.head.appendChild(AwsWafScript);
}
