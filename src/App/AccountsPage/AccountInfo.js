import React, { Component } from 'react';

import AGITokens from '../common/AGITokens/AGITokens';

class AccountInfo extends Component {
  render() {
    return (
      <section>
        <h3>Your Account details</h3>
        <div>
          <span>Account</span>
          <span>0xafd661763427a58cad8cb6b98f69b0fb053940a9</span>
        </div>
        <div>
          <span>Token Balance</span>
          <AGITokens>5.99990000</AGITokens>\
        </div>
        <div>
          <span>Escrow Balance</span>
          <AGITokens>4.00009972</AGITokens>
        </div>
        <div>
          <span>Authorized Tokens</span>
          <AGITokens>4.00009972</AGITokens>
        </div>
      </section>
    );
  }
}

export default AccountInfo;
