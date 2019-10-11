export function hasOwnDefinedProperty(object, property) {
  return object.hasOwnProperty(property) && typeof object[property] !== "undefined";
}
