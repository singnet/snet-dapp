export function hasOwnDefinedProperty(object, property) {
  return object.hasOwnProperty(property) && typeof object[property] !== "undefined";
}

export const roundToDesimals = (roundingNumber, decimals = 1) => {
  return Math.round((roundingNumber + Number.EPSILON) * (10 * decimals)) / (10 * decimals);
};

export function fileSizeConverter(sizeInBytes) {
  const sizeInKiloBytes = roundToDesimals(sizeInBytes / 1024, 2);
  if (sizeInKiloBytes > 1024) {
    const sizeInMBytes = roundToDesimals(sizeInKiloBytes / 1024, 2);
    return sizeInMBytes + "MB";
  }
  return sizeInKiloBytes + "KB";
}
