import find from "lodash/find";
import minBy from "lodash/minBy";
import isEmpty from "lodash/isEmpty";

const ONE_YEAR_BLOCKS = 2102400;

export default class PaymentChannelManagement {
  constructor(sdkContext, serviceClient) {
    this._sdkContext = sdkContext;
    this._serviceClient = serviceClient;
    this._channel = undefined;
  }

  get channel() {
    return this._channel;
  }

  get serviceClient() {
    return this._serviceClient;
  }

  async updateChannelInfo() {
    const channels = await this.serviceClient.loadOpenChannels();
    if (isEmpty(channels)) {
      return;
    }

    this._channel = minBy(channels, ({ channelId }) => channelId);
    this._sdkContext.currentChannel = this._channel;
    await this._channel.syncState();
  }

  async openChannel() {
    const serviceCallPrice = this._pricePerServiceCall();
    const defaultExpiration = await this._defaultChannelExpiration();

    this._channel = await this.serviceClient.openChannel(serviceCallPrice, defaultExpiration);
    this._sdkContext.currentChannel = this._channel;
  }

  async extendAndAddFunds(noOfServiceCalls = 1) {
    const serviceCallPrice = this._pricePerServiceCall() * noOfServiceCalls;
    const defaultExpiration = await this._defaultChannelExpiration();

    await this._channel.extendAndAddFunds(defaultExpiration, serviceCallPrice);
    await this._channel.syncState();
  }

  _pricePerServiceCall() {
    const { pricing } = this.serviceClient.group;
    const fixedPricing = find(pricing, ({ price_model }) => "fixed_price" === price_model);

    return fixedPricing.price_in_cogs;
  }

  async _defaultChannelExpiration() {
    const currentBlockNumber = await this._sdkContext.web3.eth.getBlockNumber();
    return currentBlockNumber + this.serviceClient.group.payment_expiration_threshold + ONE_YEAR_BLOCKS;
  }
}
