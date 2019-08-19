export default class ProxyPaymentChannelManagementStrategy {
  constructor(channel) {
    this._channel = channel;
  }

  async selectChannel(serviceClient) {
    return this._channel;
  }
}
