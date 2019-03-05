import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class AmountField extends Component {
  updateAmount = (event) => {
    const { value: amount } = event.target;
    this.props.amountChangeHandler(amount);
  };

  render() {
    const { id, amount, label, required } = this.props;
    return (
      <TextField
        name={`${id}-amount`}
        value={amount}
        label={label}
        required={required}
        onChange={this.updateAmount}
      />
    );
  }
}

AmountField.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  amountChangeHandler: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
};

AmountField.defaultProps = {
  amount: 0,
  label: 'Amount',
  required: false,
};

export default AmountField;
