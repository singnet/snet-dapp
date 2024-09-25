import React, { Fragment } from "react";

import ProgressBar from "snet-dapp-components/components/ProgressBar";

const PopupDetails = ({ item, active, activeSection, progressText }) => {
  if (!active) {
    return null;
  }
  return (
    <Fragment>
      <ProgressBar activeSection={activeSection} progressText={progressText} />
      {item.component}
    </Fragment>
  );
};

export default PopupDetails;
