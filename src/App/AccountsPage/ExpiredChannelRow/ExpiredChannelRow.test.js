import React from 'react';
import { fireEvent, render } from 'react-testing-library';

import ExpiredChannelRow from './ExpiredChannelRow';

describe('ExpiredChannelRow', function() {
  let channelDetails;
  let getByText;
  let getByTestId;

  beforeAll(() => {
    const randomExpiryBlock = 10378206;
    channelDetails = {
      channel_id: 101010,
      org_id: 'some org',
      display_name: 'service name',
      balance_in_cogs: "10.00000000",
      expiration: randomExpiryBlock,
    };
  });

  beforeEach(() => {
    const res = render(<ExpiredChannelRow channelDetails={channelDetails} />);
    getByText = res.getByText;
    getByTestId = res.getByTestId;
  });

  test('renders channel id', async () => {
    expect(getByText('101010')).toBeInTheDocument();
  });

  test('renders org id', async () => {
    expect(getByText('some org')).toBeInTheDocument();
  });

  test('renders service name', async () => {
    expect(getByText('service name')).toBeInTheDocument();
  });

  test('renders balance in AGI tokens', async () => {
    expect(getByText('0.00000010 AGI')).toBeInTheDocument();
  });

  test('renders expiry block', async () => {
    expect(getByText('10378206')).toBeInTheDocument();
  });

  test('renders claim channel button', async () => {
    fireEvent.click(getByTestId('expand-101010'));

    expect(getByText('Claim Channel')).toBeInTheDocument();
  });

  test('renders claim message', async () => {
    fireEvent.click(getByTestId('expand-101010'));

    const claimUnusedFundsMessage = 'This channel has unused funds and has expired. You can claim your unused tokens which will be added to your escrow balance.';
    expect(getByText(claimUnusedFundsMessage)).toBeInTheDocument();
  });
});
