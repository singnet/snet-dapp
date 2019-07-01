import React, { Component, Fragment } from "react";

import Header from "../common/Header";
import Footer from "../common/Footer";

const withInAppWrapper = InputComponent => {
  return class extends Component {
    render() {
      return (
        <Fragment>
          <Header />
          <InputComponent {...this.props} />
          <Footer />
        </Fragment>
      );
    }
  };
};

export default withInAppWrapper;
