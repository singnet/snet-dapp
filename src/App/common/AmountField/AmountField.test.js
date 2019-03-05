import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import AmountField from "./AmountField";
import TextField from '@material-ui/core/TextField';

describe('AmountField', function() {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('renders TextField with default props', () => {
    const updateAmount = jest.fn();
    const wrapper = shallow(<AmountField amountChangeHandler={updateAmount} id="unique-field-id" />);
    const inputField = wrapper.find(TextField).at(0);

    expect(inputField).toMatchSnapshot();
  });

  it('renders TextField with overridden defaults', () => {
    const updateAmount = jest.fn();
    const wrapper = shallow(
      <AmountField
        amountChangeHandler={updateAmount}
        id="unique-field-id"
        placeholder="overridden-placeholder"
        required
        amount={1}
      />
    );
    const inputField = wrapper.find(TextField).at(0);

    expect(inputField).toMatchSnapshot();
  });

  it('triggers amountChangeHandler on updating the TextField', () => {
    const updateAmount = jest.fn();
    const wrapper = shallow(<AmountField amountChangeHandler={updateAmount} id="unique-field-id" />);
    const inputField = wrapper.find(TextField).at(0);

    inputField.simulate('change', { target: { value: 1 } });

    expect(updateAmount).toHaveBeenCalledWith(1);
  });

  it('triggers amountChangeHandler on updating the TextField with existing value', () => {
    const updateAmount = jest.fn();
    const wrapper = shallow(<AmountField amountChangeHandler={updateAmount} id="unique-field-id" amount={0.001} />);
    const inputField = wrapper.find(TextField).at(0);

    inputField.simulate('change', { target: { value: 0.0010 } });

    expect(updateAmount).toHaveBeenCalledWith(0.0010);
  });
});
