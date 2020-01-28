import { PaymentChannel } from "snet-sdk-web";

export default class PaypalPaymentChannelMgmtStrategy {
  constructor(sdk, channelId) {
    this._sdk = sdk;
    this._channelId = channelId;
  }

  async selectChannel(serviceClient) {
    const channel = this._channel(serviceClient);
    await channel.syncState();

    return Promise.resolve(channel);
  }

  _channel(serviceClient) {
    return new PaymentChannel(
      this._channelId,
      this._sdk.web3,
      this._sdk.account,
      serviceClient,
      this._sdk._mpeContract
    );
  }
}
