export const getCurrentUTCEpoch = () => {
  const currentDate = new Date();
  const currentUTCDate = new Date(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate(),
    currentDate.getUTCHours(),
    currentDate.getUTCMinutes(),
    currentDate.getUTCSeconds()
  );
  const currentUTCEpoch = Math.floor(currentUTCDate.getTime() / 1000);
  return currentUTCEpoch;
};
