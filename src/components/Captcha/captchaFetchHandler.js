import { checkWAFEnv, getWAFEnv } from "./WAFScriptLoad";

export const captchaFetch = (path, init) => {
  const { isValid, errors } = checkWAFEnv();
  if (!isValid) {
    throw Error(errors[0]);
  }

  const modalOverlay = document.getElementById("modalOverlay");
  const modal = document.getElementById("modal");
  const captchaForm = document.getElementById("captchaForm");
  const API_KEY = getWAFEnv().CAPTCHA_TOKEN;

  if (!modalOverlay || !modal || !captchaForm || !API_KEY) {
    throw Error("Can't find modal components");
  }

  modalOverlay.style.display = "block";
  modal.style.display = "block";

  return new Promise((resolve) => {
    window.AwsWafCaptcha.renderCaptcha(captchaForm, {
      onSuccess: () => {
        modalOverlay.style.display = "none";
        modal.style.display = "none";
        resolve(window.AwsWafIntegration.fetch(path, init));
      },
      onLoad: () => {
        document.body.style.cursor = "default";
      },
      apiKey: API_KEY,
    });
  });
};
