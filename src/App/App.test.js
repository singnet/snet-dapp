import React from 'react';
import { shallow } from 'enzyme';

import App from "./App";
import AppHeader from "./AppHeader/AppHeader";
import AppContent from "./AppContent/AppContent";

describe('App', function() {
  it('renders AppHeader', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(AppHeader)).toHaveLength(1);
  });

  it('renders AppContent', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(AppContent)).toHaveLength(1);
  });
});
