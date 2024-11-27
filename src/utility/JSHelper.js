export function hasOwnDefinedProperty(object, property) {
  return object.hasOwnProperty(property) && typeof object[property] !== "undefined";
}

const roundTwoDesimals = (roundingNumber) => {
  return Math.round((roundingNumber + Number.EPSILON) * 100) / 100;
};

export function fileSizeConverter(sizeInBytes) {
  const sizeInKiloBytes = roundTwoDesimals(sizeInBytes / 1024);
  if (sizeInKiloBytes > 1024) {
    const sizeInMBytes = roundTwoDesimals(sizeInKiloBytes / 1024);
    return sizeInMBytes + "MB";
  }
  return sizeInKiloBytes + "KB";
}
