import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LandingPage from '../../LandingPage/LandingPage';
import AccountPage from '../../AccountsPage/AccountPage';
import ServiceListing from '../../ServiceListing/ServiceListing';

class AppContent extends Component {
  render() {
    return (
      <main>
        <Route exact path="/" component={LandingPage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/services" component={ServiceListing} />
      </main>
    );
  }
}

export default AppContent;
