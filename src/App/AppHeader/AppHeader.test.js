import React from 'react';
import { shallow } from 'enzyme';

import AppHeader from "./AppHeader";
import AppNav from "./AppNav/AppNav";

describe('AppHeader', function() {
  it('renders AppNav', () => {
    const wrapper = shallow(<AppHeader />);

    expect(wrapper.find(AppNav)).toHaveLength(1);
  });
});
