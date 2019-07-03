import React, { Fragment } from "react";

import LoginOnboardingHeader from "../common/LoginOnboardingHeader";

const withRegistrationHeader = (InputComponent, headerData) => {
  return props => {
    return (
      <Fragment>
        <LoginOnboardingHeader headerData={headerData} />
        <InputComponent {...props} />
      </Fragment>
    );
  };
};

export default withRegistrationHeader;
