import Web3 from 'web3';
import { ethereumMethods } from '../utils/ethereumUtils';

import logger from '../utils/logger';
import blockChainEvents from '../utils/blockchainEvents';

/**
 * @implements Identity
 */
class MetaMaskIdentity {
  /**
   * @param {Config} config
   * @param {Web3} web3
   */
  constructor(config, web3) {
    this._eth = new Web3(config.web3Provider);
    this._web3 = web3;
    this.setupAccount();
  }

  async getAddress() {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: ethereumMethods.REQUEST_ACCOUNTS });
    return accounts[0];
  }

  async signData(sha3Message) {
    const address = await this.getAddress();
    const { ethereum } = window;

    return ethereum.request({
      method: 'personal_sign',
      params: [sha3Message, address],
    });
  }

  async sendTransaction(transactionObject) {
    return new Promise((resolve, reject) => {
      const method = this._web3.eth
        .sendTransaction(transactionObject)
        .on(blockChainEvents.ERROR, (error) => {
          logger.error(`Couldn't send transaction. ${error}`);
          reject(error);
        })
        .once(blockChainEvents.CONFIRMATION, async (_confirmationNumber, receipt) => {
          if(_confirmationNumber.receipt.status) {
            resolve(_confirmationNumber.receipt);
          } else {
            reject(_confirmationNumber.receipt);
          }
          // await method.off();
        });
    });
  }

  async setupAccount() {
    const { ethereum } = window;
    if(typeof ethereum !== 'undefined') {
      const accounts = await ethereum.request({ method: ethereumMethods.REQUEST_ACCOUNTS });
      this._web3.eth.defaultAccount = accounts[0];
    } else {
      logger.error('Metamask is not installed');
    }
  }
}

export default MetaMaskIdentity;
