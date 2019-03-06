import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import AGITokens from '../../common/AGITokens/AGITokens';

const ExpiredChannelRow = ({ channelDetails }) => {
  const { channel_id, org_id, display_name, balance_in_cogs, expiration } = channelDetails;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon data-testid={`expand-${channel_id}`} />}>
        <span>{channel_id}</span>
        <span>{org_id}</span>
        <span>{display_name}</span>
        <span><AGITokens>{(balance_in_cogs / 100000000).toFixed(8)}</AGITokens></span>
        <span>{expiration}</span>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <span>This channel has unused funds and has expired. You can claim your unused tokens which will be added to your escrow balance.</span>
        <button>Claim Channel</button>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const channelDetailsShape = {
  channel_id: PropTypes.number.isRequired,
  org_id: PropTypes.string.isRequired,
  display_name: PropTypes.string.isRequired,
  balance_in_cogs: PropTypes.string.isRequired,
  expiration: PropTypes.number.isRequired,
};

ExpiredChannelRow.propTypes = {
  channelDetails: PropTypes.shape(channelDetailsShape).isRequired,
};

export default ExpiredChannelRow;
