import React, { Component } from 'react';

import AppHeader from "./AppHeader/AppHeader";
import AppContent from "./AppContent/AppContent";

class App extends Component {
  render() {
    return (
      <>
        <AppHeader />
        <AppContent />
      </>
    );
  }
}

export default App;
