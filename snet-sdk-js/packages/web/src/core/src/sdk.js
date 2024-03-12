import Web3 from 'web3';
import { find, first } from 'lodash';

import Account from './Account';
import MPEContract from './MPEContract';
import logger from './utils/logger';
import IPFSMetadataProvider from './IPFSMetadataProvider';
import { DefaultPaymentStrategy } from '../../payment_strategies';

const DEFAULT_CONFIG = {
  defaultGasLimit: 210000,
  defaultGasPrice: 4700000,
  ipfsEndpoint: 'http://ipfs.singularitynet.io:80',
};

class SnetSDK {
  /**
   * @param {Config} config
   * @param {MetadataProvider} metadataProvider
   */
  constructor(config, metadataProvider = undefined) {
    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
    const options = {
      defaultGas: this._config.defaultGasLimit,
      defaultGasPrice: this._config.defaultGasPrice,
    };
    this._networkId = config.networkId;
    this._web3 = new Web3(config.web3Provider, null, options);
    const identity = this._createIdentity();
    this._mpeContract = new MPEContract(this._web3, this._networkId);
    this._account = new Account(this._web3, this._networkId, this._mpeContract, identity);
    this._metadataProvider =      metadataProvider || new IPFSMetadataProvider(this._web3, this._networkId, this._config.ipfsEndpoint);
  }

  /**
   * @type {Account}
   */
  get account() {
    return this._account;
  }

  /**
   * @type {Web3}
   */
  get web3() {
    return this._web3;
  }

  set paymentChannelManagementStrategy(paymentChannelManagementStrategy) {
    this._paymentChannelManagementStrategy = paymentChannelManagementStrategy;
  }

  async _serviceGroup(serviceMetadata, orgId, serviceId, groupName = undefined) {
    const group = this._findGroup(serviceMetadata.groups, groupName);
    if(!group) {
      const errorMessage = `Group[name: ${groupName}] not found for orgId: ${orgId} and serviceId: ${serviceId}`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    return group;
  }

  _findGroup(groups, groupName) {
    if(!groupName) {
      return first(groups);
    }

    return find(groups, ({ group_name }) => group_name === groupName);
  }

  _constructStrategy(paymentChannelManagementStrategy, concurrentCalls = 1) {
    if (paymentChannelManagementStrategy) {
      return paymentChannelManagementStrategy;
    }

    if (this._paymentChannelManagementStrategy) {
      return this._paymentChannelManagementStrategy;
    }

    logger.debug('PaymentChannelManagementStrategy not provided, using DefaultPaymentChannelManagementStrategy');
    // return new DefaultPaymentChannelManagementStrategy(this);
    return new DefaultPaymentStrategy(concurrentCalls);
  }

  _createIdentity() {
    logger.error('_createIdentity must be implemented in the sub classes');
  }
}

export default SnetSDK;
