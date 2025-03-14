export const eventListenerForKey = ({ keyValue, callback, isCtrlPress = false }) => {
  async function callBackCaller(event) {
    if (event?.code === keyValue && event?.ctrlKey === isCtrlPress) {
      await callback();
    }
  }
  return callBackCaller;
};
