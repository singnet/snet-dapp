import React, { Fragment } from "react";

import Header from "../common/Header";
import Footer from "../common/Footer";

const withInAppWrapper = InputComponent => {
  return props => {
    return (
      <Fragment>
        <Header />
        <div className="scrollableContent">
        	<InputComponent {...props} />
        	<Footer />
        </div>
      </Fragment>
    );
  };
};

export default withInAppWrapper;
