import React from 'react';
import { shallow } from 'enzyme';

import AmountField from "./AmountField";

describe('AmountField', function() {
  it('renders input field with default props', () => {
    const updateAmount = jest.fn();
    const wrapper = shallow(<AmountField amountChangeHandler={updateAmount} id="unique-field-id" />);
    const inputField = wrapper.find('input').at(0);

    expect(inputField).toMatchSnapshot();
  });

  it('renders input field with overridden defaults', () => {
    const updateAmount = jest.fn();
    const wrapper = shallow(
      <AmountField
        amountChangeHandler={updateAmount}
        id="unique-field-id"
        placeholder="overridden-placeholder"
        amount={1}
      />
    );
    const inputField = wrapper.find('input').at(0);

    expect(inputField).toMatchSnapshot();
  });

  it('triggers amountChangeHandler on updating the input field', () => {
    const updateAmount = jest.fn();
    const wrapper = shallow(<AmountField amountChangeHandler={updateAmount} id="unique-field-id" />);
    const inputField = wrapper.find('input').at(0);

    inputField.simulate('change', { target: { value: 1 } });

    expect(updateAmount).toHaveBeenCalledWith(1);
  });

  it('triggers amountChangeHandler on updating the input field with existing value', () => {
    const updateAmount = jest.fn();
    const wrapper = shallow(<AmountField amountChangeHandler={updateAmount} id="unique-field-id" amount={0.001} />);
    const inputField = wrapper.find('input').at(0);

    inputField.simulate('change', { target: { value: 0.0010 } });

    expect(updateAmount).toHaveBeenCalledWith(0.0010);
  });
});
