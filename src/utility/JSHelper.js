export function hasOwnDefinedProperty(object, property) {
  return object.hasOwnProperty(property) && typeof object[property] !== "undefined";
}

export const FormatTime12Hours = time => {
  const [hours, mins] = time.split(":");
  const AMPM = hours < 12 ? "AM" : "PM";
  const convertedHours = hours < 12 ? hours : hours % 12 || 12;
  return `${convertedHours}:${mins} ${AMPM}`;
};
