import React from "react";

import StyledButton from "../../common/StyledButton";
import DemoExample from "./DemoExample";

const DemoToggler = ({ showDemo }) => {
  if (showDemo) {
    return <DemoExample />;
  }
  return (
    <div>
      <StyledButton btnText="login" type="transparent" onClick={this.handleSubmit} />
      <StyledButton btnText="signup and run for free" />
    </div>
  );
};

export default DemoToggler;
