export default class ProxyPaymentChannelManagementStrategy {
  constructor(channel) {
    this._channel = channel;
  }

  selectChannel(serviceClient) {
    return this._channel;
  }
}
