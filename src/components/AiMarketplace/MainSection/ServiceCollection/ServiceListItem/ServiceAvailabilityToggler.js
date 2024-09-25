import React from "react";
import OfflineIndicator from "snet-dapp-components/components/OfflineIndicator";
import StyledButton from "snet-dapp-components/components/StyledButton";

const ServiceAvailabilityToggler = ({ isAvailable }) => {
  if (!isAvailable) {
    return <OfflineIndicator show />;
  }
  return <StyledButton type="transparent" btnText="demo" />;
};

export default ServiceAvailabilityToggler;
