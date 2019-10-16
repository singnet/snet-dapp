import React from "react";
import OfflineIndicator from "../../../../../common/OfflineIndicator";
import StyledButton from "../../../../../common/StyledButton";

const ServiceAvailabilityToggler = ({ isAvailable }) => {
  if (!isAvailable) {
    return <OfflineIndicator show />;
  }
  return <StyledButton type="transparent" btnText="demo" />;
};

export default ServiceAvailabilityToggler;
