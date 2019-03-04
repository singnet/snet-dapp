import React, { Component } from 'react';

import AccountInfo from './AccountInfo';
import EscrowAccountOperationsCard from './EscrowAccountOperationsCard';
import ExpiredChannelList from './ExpiredChannelList';

class AccountPage extends Component {
  render() {
    return (
      <>
        <AccountInfo />
        <EscrowAccountOperationsCard />
        <ExpiredChannelList />
      </>
    );
  }
}

export default AccountPage;
