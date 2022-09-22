import React, { Fragment } from "react";

import ProgressBar from "../../../common/ProgressBar";

const CreateModelContainer = ({ item, active, activeSection, progressText }) => {
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

export default CreateModelContainer;
