import { EncodingUtils } from '../sdk-core';
import { FreeCallStateServiceClient } from '../proto/state_service_pb_service';

class FreeCallPaymentStrategy {
  constructor(serviceClient) {
    this._serviceClient = serviceClient;
    this._freeCallStateServiceClient = this._generateFreeCallStateServiceClient();
    this._encodingUtils = new EncodingUtils();
  }

  /**
   * Check if there is any freecalls left for x service.
   * @returns {Promise<boolean>}
   */
  async isFreeCallAvailable() {
    try {
      const freeCallsAvailableReply = await this._getFreeCallsAvailable();
      const freeCallsAvailable = freeCallsAvailableReply.getFreeCallsAvailable();
      console.log('freeCallsAvailable', freeCallsAvailable);
      return freeCallsAvailable > 0;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }

  /**
   * generate free call payment metadata
   * @returns {Promise<({'snet-free-call-auth-token-bin': FreeCallConfig.tokenToMakeFreeCall}|{'snet-free-call-token-expiry-block': *}|{'snet-payment-type': string}|{'snet-free-call-user-id': *}|{'snet-current-block-number': *})[]>}
   */
  async getPaymentMetadata() {
    const { email, tokenToMakeFreeCall, tokenExpiryDateBlock } = this._serviceClient.getFreeCallConfig();
    const currentBlockNumber = await this._serviceClient.getCurrentBlockNumber();
    const signature = await this._generateSignature(currentBlockNumber);

    const tokenBytes = this._encodingUtils.hexStringToBytes(tokenToMakeFreeCall)

    const metadata = [
      { 'snet-free-call-auth-token-bin': tokenBytes.toString('base64') },
      { 'snet-free-call-token-expiry-block': `${tokenExpiryDateBlock}` },
      { 'snet-payment-type': 'free-call' },
      { 'snet-free-call-user-id': email },
      { 'snet-current-block-number': `${currentBlockNumber}` },
      { 'snet-payment-channel-signature-bin': signature.toString('base64') }];
    return metadata;
  }

  /**
   * fetch the free calls available data from daemon
   * @returns {Promise<FreeCallStateReply>}
   * @private
   */
  async _getFreeCallsAvailable() {
    const freeCallStateRequest = await this._getFreeCallStateRequest();
    return new Promise((resolve, reject) => {
      this._freeCallStateServiceClient.getFreeCallsAvailable(freeCallStateRequest, (error, responseMessage) => {
        if(error) {
          console.log('freecalls error', error);
          reject(error);
        } else {
          resolve(responseMessage);
        }
      });
    });
  }

  /**
   *
   * @returns {Promise<Bytes<Signature>>>}
   * @private
   */
  async _generateSignature(currentBlockNumber) {
    const { orgId, serviceId, groupId } = this._serviceClient.getServiceDetails();
    const { email, tokenToMakeFreeCall, tokenExpiryDateBlock } = this._serviceClient.getFreeCallConfig();
    if(tokenExpiryDateBlock === 0 || !email || email.length === 0 || !tokenToMakeFreeCall || tokenToMakeFreeCall.length === 0) {
      throw Error('invalid entries');
    }

    return this._serviceClient.signData(
      { t: 'string', v: '__prefix_free_trial' },
      { t: 'string', v: email },
      { t: 'string', v: orgId },
      { t: 'string', v: serviceId },
      { t: 'string', v: groupId },
      { t: 'uint256', v: currentBlockNumber },
      { t: 'bytes', v: tokenToMakeFreeCall.substring(2, tokenToMakeFreeCall.length) },
    );
  }

  /**
   * create the request for the freecall state service grpc
   * @returns {FreeCallStateRequest}
   * @private
   */
  async _getFreeCallStateRequest() {
    const Request = this._freeCallStateServiceClient.getFreeCallsAvailable.requestType;
    const request = new Request();

    const {
      userId, tokenForFreeCall, tokenExpiryDateBlock, signature, currentBlockNumber,
    } = await this._getFreeCallStateRequestProperties();

    const tokenBytes = this._encodingUtils.hexStringToBytes(tokenForFreeCall)

    request.setUserId(userId);
    request.setTokenForFreeCall(tokenBytes);
    request.setTokenExpiryDateBlock(tokenExpiryDateBlock);
    request.setSignature(signature);
    request.setCurrentBlock(currentBlockNumber);
    return request;
  }

  async _getFreeCallStateRequestProperties() {
    const { email, tokenToMakeFreeCall, tokenExpiryDateBlock } = this._serviceClient.getFreeCallConfig();
    const currentBlockNumber = await this._serviceClient.getCurrentBlockNumber();
    const signature = await this._generateSignature(currentBlockNumber);
    return {
      userId: email, tokenForFreeCall: tokenToMakeFreeCall, tokenExpiryDateBlock, signature, currentBlockNumber,
    };
  }

  /**
   * create the grpc client for free call state service
   * @returns {FreeCallStateServiceClient}
   * @private
   */
  _generateFreeCallStateServiceClient() {
    const serviceEndpoint = this._serviceClient._getServiceEndpoint();
    // const grpcCredentials = this._getGrpcCredentials(serviceEndpoint);
    // return new services.FreeCallStateServiceClient(serviceEndpoint.host, grpcCredentials);
    return new FreeCallStateServiceClient(serviceEndpoint.host);
  }
}

export default FreeCallPaymentStrategy;
