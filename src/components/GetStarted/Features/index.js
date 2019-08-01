import React from "react";
import { withStyles } from "@material-ui/styles";
import { GetStartedFeaturesData } from "../../../utility/constants/GetStarted";

import Feature from "./Feature";
import { useStyles } from "./styles";

const Features = ({ classes }) => {
  return (
    <div className={classes.FeaturesWrapper}>
      <h2>All-in-one solution with powerful features</h2>
      <div className={classes.FeatureContainer}>
        {GetStartedFeaturesData.map(item => (
          <Feature
            key={item.featureName}
            icon={item.featureIcon}
            title={item.featureName}
            description={item.featureDescription}
          />
        ))}
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Features);
