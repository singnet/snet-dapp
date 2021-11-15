export default class ProxyPaymentChannelManagementStrategy {
  constructor(channel) {
    this._channel = channel;
  }

  selectChannel(serviceClient) {
    return this._channel;
  }

  async generateSignature(serviceClient, channelId, nonce, amount) {
    return serviceClient.signData(
      {
        t: "string",
        v: "__MPE_claim_message",
      },
      {
        t: "address",
        v: serviceClient.mpeContract.address,
      },
      {
        t: "uint256",
        v: channelId,
      },
      {
        t: "uint256",
        v: nonce,
      },
      {
        t: "uint256",
        v: amount,
      }
    );
  }

  async getPaymentMetadata(serviceClient) {
    const channel = await this.selectChannel();

    const amount = channel.state.currentSignedAmount.toNumber() + serviceClient._pricePerServiceCall.toNumber();

    const signature = await this.generateSignature(serviceClient, channel.channelId, channel.state.nonce, amount);
    return [
      {
        "snet-payment-type": "escrow",
      },
      {
        "snet-payment-channel-id": `${channel.channelId}`,
      },
      {
        "snet-payment-channel-nonce": `${channel.state.nonce}`,
      },
      {
        "snet-payment-channel-amount": `${amount}`,
      },
      {
        "snet-payment-channel-signature-bin": signature.toString("base64"),
      },
    ];
  }
}
