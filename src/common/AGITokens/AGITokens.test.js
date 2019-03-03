import React from 'react';
import { shallow } from 'enzyme';

import AGITokens from "./AGITokens";

describe('AGITokens', function() {
  it('renders as expected', () => {
    const wrapper = shallow(<AGITokens>0.00000001</AGITokens>);

    expect(wrapper).toMatchSnapshot();
  });
});
