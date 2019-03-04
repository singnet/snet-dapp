import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AmountField extends Component {
  updateAmount = (event) => {
    const { value: amount } = event.target;
    this.props.amountChangeHandler(amount);
  };

  render() {
    const { id, amount, placeholder } = this.props;
    return (
      <input
        type="number"
        name={`${id}-amount`}
        value={amount}
        placeholder={placeholder}
        onChange={this.updateAmount}
      />
    );
  }
}

AmountField.propTypes = {
  amount: PropTypes.number,
  amountChangeHandler: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

AmountField.defaultProps = {
  placeholder: '',
};

export default AmountField;
