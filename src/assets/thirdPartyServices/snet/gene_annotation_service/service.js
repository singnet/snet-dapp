export const RESULT_ADDR = "https://annotation.mozi.ai/web";

export const downloadSchemeFile = id => {
  window.open(`${RESULT_ADDR}/result_file/${id}`);
};

export const downloadCSVFile = (id, annotation) => {
  window.open(`${RESULT_ADDR}/csv_file/${id}/${annotation.substr(0, annotation.length - 4)}`);
};

export const capitalizeFirstLetter = string => {
  return string[0].toUpperCase() + string.slice(1);
};
