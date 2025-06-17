import find from "lodash/find";
import minBy from "lodash/minBy";
import isEmpty from "lodash/isEmpty";
import { PaymentChannelProvider } from "snet-sdk-core/mpe";

const ONE_YEAR_BLOCKS = 2102400;

export default class PaymentChannelManagement {
  constructor(sdkContext, metadataProvider) {
    this._sdkContext = sdkContext;
    this._metadataProvider = metadataProvider;
    this._channel = undefined;
    this.paymentChannelProvider = undefined;
  }

  get channel() {
    return this._channel;
  }

  get metadataProvider() {
    return this._metadataProvider;
  }

  async updateChannelInfo() {
    try {
      console.log(this._sdkContext);

      this.paymentChannelProvider = new PaymentChannelProvider(this._sdkContext._account, this._metadataProvider);
      console.log(this.paymentChannelProvider);
      const channels = await this.paymentChannelProvider.loadOpenChannels();
      if (isEmpty(channels)) {
        return;
      }

      this._channel = minBy(channels, ({ channelId }) => channelId);
      await this._channel.syncState();
    } catch (error) {
      console.error("update channel: ", error);
      throw new Error(error);
    }
  }

  async openChannel(noOfServiceCalls = 1) {
    const serviceCallPrice = this.noOfCallsToCogs(noOfServiceCalls);
    const defaultExpiration = await this._channelExtensionBlockNumber();

    this._channel = await this.paymentChannelProvider.openChannel(serviceCallPrice, defaultExpiration);
    await this._channel.syncState();
    this._sdkContext.currentChannel = this._channel;
  }

  async extendChannel() {
    const defaultExpiration = await this._channelExtensionBlockNumber();

    await this._channel.extendExpiry(defaultExpiration);
    await this._channel.syncState();
  }

  async extendAndAddFunds(noOfServiceCalls = 1) {
    try {
      const serviceCallPrice = this.noOfCallsToCogs(noOfServiceCalls);
      const defaultExpiration = await this._channelExtensionBlockNumber();

      await this._channel.extendAndAddFunds(defaultExpiration, serviceCallPrice);
      await this._channel.syncState();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async canUseChannel() {
    if (!this._channel) {
      return false;
    }
    const isValid = await this._isValid();
    return isValid && this._hasSufficientFunds();
  }

  availableBalance() {
    if (!this._channel) {
      return 0;
    }
    return this._channel.state.availableAmount;
  }

  noOfCallsToCogs(noOfServiceCalls) {
    return this._pricePerServiceCall() * noOfServiceCalls;
  }

  async isChannelNearToExpiry() {
    const channelExpiry = (await this._channel?.state?.expiry) ?? 0;
    const blockNumber = await this._sdkContext.web3.eth.getBlockNumber();
    const threshold = this.serviceClient.group.payment_expiration_threshold;
    const difference = Math.abs(Number(channelExpiry - blockNumber));
    return difference <= threshold;
  }

  async _isValid() {
    const expiry = await this._defaultChannelExpiration();
    return this._channel.state.expiration > expiry;
  }

  _hasSufficientFunds() {
    return this._channel.state.availableAmount >= this._pricePerServiceCall();
  }

  _pricePerServiceCall() {
    const { pricing } = this._metadataProvider.group;
    const fixedPricing = find(pricing, ({ price_model }) => "fixed_price" === price_model);

    return fixedPricing.price_in_cogs;
  }

  async _channelExtensionBlockNumber() {
    const currentBlockNumber = await this._sdkContext.web3.eth.getBlockNumber();

    const channelExpiryBlock = this._channel?.state?.expiry ?? 0;

    const defaultExpiration =
      Number(currentBlockNumber) + this._metadataProvider.group.payment_expiration_threshold + ONE_YEAR_BLOCKS;

    return channelExpiryBlock < defaultExpiration ? defaultExpiration : channelExpiryBlock;
  }

  async _defaultChannelExpiration() {
    const currentBlockNumber = await this._sdkContext.web3.eth.getBlockNumber();
    return currentBlockNumber + this._metadataProvider.group.payment_expiration_threshold;
  }
}
