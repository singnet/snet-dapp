import React from 'react';
import { shallow } from 'enzyme';

import AccountPage from './AccountPage';
import AccountInfo from './AccountInfo';
import EscrowAccountOperationsCard from './EscrowAccountOperationsCard';
import ExpiredChannelList from './ExpiredChannelList';

describe('AccountPage', function() {
  it('renders AccountInfo', () => {
    const wrapper = shallow(<AccountPage />);

    expect(wrapper.find(AccountInfo)).toHaveLength(1);
  });

  it('renders EscrowAccountOperationsCard', () => {
    const wrapper = shallow(<AccountPage />);

    expect(wrapper.find(EscrowAccountOperationsCard)).toHaveLength(1);
  });

  it('renders ExpiredChannelList', () => {
    const wrapper = shallow(<AccountPage />);

    expect(wrapper.find(ExpiredChannelList)).toHaveLength(1);
  });
});

