import { logger } from './sdk-core';
import { toBNString } from './core/src/utils/bignumber_helper';
import { TokenService, TokenServiceClient } from './proto/token_service_pb_service';

class ConcurrencyManager {
  constructor(concurrentCalls = 1, serviceClient) {
    this._concurrentCalls = concurrentCalls;
    this._serviceClient = serviceClient;
    this._tokenServiceClient = this._generateTokenServiceClient();
  }

  get concurrentCalls() {
    return this._concurrentCalls;
  }

  async getToken(channel, serviceCallPrice) {
    const currentSignedAmount = channel.state.currentSignedAmount.toNumber();
    if(currentSignedAmount !== 0) {
      const { plannedAmount, usedAmount, token } = await this._getTokenForAmount(channel, currentSignedAmount);
      if(usedAmount < plannedAmount) {
        return token;
      }
    }
    const newAmountToBeSigned = currentSignedAmount + serviceCallPrice;
    return this._getNewToken(channel, newAmountToBeSigned);
  }

  /**
   * @param {ServiceClient} serviceClient
   * @param {PaymentChannel} channel
   * @param {number} amount
   * @returns {Promise<string | undefined>} token
   * @private
   */
  async _getNewToken(channel, amount) {
    const tokenResponse = await this._getTokenForAmount(channel, amount);
    const { token } = tokenResponse;
    return token;
  }

  async _getTokenServiceRequest(channel, amount) {
    const { nonce } = channel.state;
    const currentBlockNumber = await this._serviceClient.getCurrentBlockNumber();

    const mpeSignature = await this._generateMpeSignature(parseInt(channel.channelId, 10), parseInt(nonce, 10), amount);
    const tokenSignature = await this._generateTokenSignature(mpeSignature, currentBlockNumber);
    const GetTokenRequest = TokenService.GetToken.requestType;
    const request = new GetTokenRequest();
    request.setChannelId(parseInt(channel.channelId, 10));
    request.setCurrentNonce(parseInt(nonce, 10));
    request.setSignedAmount(amount);
    request.setSignature(tokenSignature);
    request.setCurrentBlock(toBNString(currentBlockNumber));
    request.setClaimSignature(mpeSignature);
    return request;
  }

  /**
   * Get token for the given amount
   * @param {ServiceClient} serviceClient
   * @param {PaymentChannel} channel
   * @param {number} amount
   * @returns {Promise<string>} token
   * @private
   */
  async _getTokenForAmount(channel, amount) {
    const request = await this._getTokenServiceRequest(channel, amount);
    return new Promise((resolve, reject) => {
      this._tokenServiceClient.getToken(request, (error, responseMessage) => {
        if(error) {
          console.log('token grpc error', error);
          reject(error);
        } else {
          resolve({
            plannedAmount: responseMessage.getPlannedAmount(),
            usedAmount: responseMessage.getUsedAmount(),
            token: responseMessage.getToken(),
          });
        }
      });
    });
  }

  async _generateTokenSignature(mpeSignature, currentBlockNumber) {
    const mpeSignatureHex = mpeSignature.toString('hex');
    return this._serviceClient.signData({ t: "bytes", v: mpeSignatureHex }, { t: "uint256", v: currentBlockNumber });
  }

  async _generateMpeSignature(channelId, nonce, signedAmount) {
    return this._serviceClient.signData(
      { t: 'string', v: '__MPE_claim_message' },
      { t: 'address', v: this._serviceClient.mpeContract.address },
      { t: 'uint256', v: channelId },
      { t: 'uint256', v: nonce },
      { t: 'uint256', v: signedAmount },
    );
  }

  _generateTokenServiceClient() {
    logger.debug('Creating TokenService client', { tags: ['gRPC'] });
    const serviceEndpoint = this._serviceClient._getServiceEndpoint();
    logger.debug(`TokenService pointing to ${serviceEndpoint.host}, `, { tags: ['gRPC'] });
    const host = `${serviceEndpoint.protocol}//${serviceEndpoint.host}`;
    return new TokenServiceClient(host);
  }
}

export default ConcurrencyManager;
