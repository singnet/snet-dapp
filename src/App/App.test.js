import React from 'react';
import { shallow } from 'enzyme';

import App from "./App";
import AppContent from "./AppContent/AppContent";

describe('App', function() {
  it('renders AppContent', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(AppContent)).toHaveLength(1);
  });
});
