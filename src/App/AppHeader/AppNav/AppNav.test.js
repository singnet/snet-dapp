import React from 'react';
import { shallow } from 'enzyme';
import { Link, MemoryRouter } from "react-router-dom";

import AppNav from "./AppNav";

describe('AppNav', function() {
  let appNav;
  beforeAll(() => {
    const wrapper = shallow(<MemoryRouter><AppNav /></MemoryRouter>);
    appNav = wrapper.find(AppNav).dive();
  });

  it('renders 3 links', () => {
    expect(appNav.find(Link)).toHaveLength(3);
  });

  it('renders home link at root path /', () => {
    const homeLink = appNav.find(Link).at(0);

    expect(homeLink.props().to).toEqual('/');
  });

  it('renders account link with path /account', () => {
    const accountLink = appNav.find(Link).at(1);

    expect(accountLink.props().to).toEqual('/account');
  });

  it('renders services link with path /services', () => {
    const accountLink = appNav.find(Link).at(2);

    expect(accountLink.props().to).toEqual('/services');
  });
});
