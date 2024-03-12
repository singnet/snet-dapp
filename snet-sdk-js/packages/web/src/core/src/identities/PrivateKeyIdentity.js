import blockChainEvents from '../utils/blockchainEvents';
/**
 * @implements Identity
 */
class PrivateKeyIdentity {
  /**
   * @param {Config} config
   * @param {Web3} web3
   */
  constructor(config, web3) {
    this._web3 = web3;
    this._pk = config.privateKey;
    this._setupAccount();
  }

  get address() {
    return this._web3.eth.defaultAccount;
  }

  async getAddress() {
    return this._web3.eth.defaultAccount;
  }

  async signData(sha3Message) {
    const { signature } = this._web3.eth.accounts.sign(sha3Message, this._pk);
    return signature;
  }

  async sendTransaction(transactionObject) {
    const signedTransaction = await this._signTransaction(transactionObject);
    return new Promise((resolve, reject) => {
      const method = this._web3.eth.sendSignedTransaction(signedTransaction);
      method.once(blockChainEvents.CONFIRMATION, async (_confirmationNumber, receipt) => {
        console.log('blockchain confirmation count', _confirmationNumber);
        console.log('blockchain confirmation receipt status', _confirmationNumber.receipt.status);
        if(_confirmationNumber.receipt.status) {
          resolve(_confirmationNumber.receipt);
        } else {
          reject(_confirmationNumber.receipt);
        }
        // await method.off();
      });
      method.on(blockChainEvents.ERROR, (error) => {
        console.log('blockchain error', error);
        reject(error);
      });
      method.once(blockChainEvents.TRANSACTION_HASH, (hash) => {
        console.log('waiting for blockchain txn', hash);
      });
      method.once(blockChainEvents.RECEIPT, (receipt) => {
        console.log('blockchain receipt', receipt.status);
      });
    });
  }

  async _signTransaction(txObject) {
    delete txObject.chainId;
    const privateKey = Buffer.from(this._pk.slice(2), 'hex');
    const signedTx = await this._web3.eth.accounts.signTransaction(txObject, privateKey);
    return signedTx.rawTransaction;
  }

  _setupAccount() {
    const account = this._web3.eth.accounts.privateKeyToAccount(this._pk);
    this._web3.eth.accounts.wallet.add(account);
    this._web3.eth.defaultAccount = account.address;
  }
}

export default PrivateKeyIdentity;
