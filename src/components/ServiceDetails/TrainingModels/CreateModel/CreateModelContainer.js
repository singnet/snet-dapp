import React, { Fragment } from "react";

import ProgressBar from "snet-dapp-components/components/ProgressBar";

const CreateModelContainer = ({ item, active, activeSection, progressText, key }) => {
  if (!active) {
    return null;
  }
  return (
    <Fragment key={key}>
      <ProgressBar activeSection={activeSection} progressText={progressText} />
      {item.component}
    </Fragment>
  );
};

export default CreateModelContainer;
