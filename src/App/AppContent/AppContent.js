import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LandingPage from "../../LandingPage/LandingPage";

class AppContent extends Component {
  render() {
    return (
      <main>
        <Route exact path="/" component={LandingPage} />
      </main>
    );
  }
}

export default AppContent;
