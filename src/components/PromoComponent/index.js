import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import Routes from "../../utility/constants/Routes";

const PromoComponent = ({ classes }) => {
  return (
    <div className={classes.promoContainer}>
      <div className={classes.promoWrapper}>
        <div className={classes.box}>
          <img src="http://placehold.it/100x100" alt="Looking for New AI Service" />
          <div>
            <span>Looking for a different AI Service?</span>
            <p>
              If you have a need for a specific AI service, we would love to know! We will discuss the details with you
              or use the suggestion to incentivize our network.
            </p>
            <a href={`/${Routes.AI_REQUEST_FORM}`} title="Request AI Form">
              request ai form
            </a>
          </div>
        </div>
        <div className={classes.box}>
          <img src="http://placehold.it/100x100" alt="Looking for New AI Service" />
          <div>
            <span>Interested in earning AGIX?</span>
            <p>
              We've made it fast and easy to publish your own services through AI Publisher. Start earning AGIX tokens
              by publishing services into AI Marketplace.
            </p>
            <a href="https://publisher.singularitynet.io/" title="Visit AI Publisher">
              visit ai publisher
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(PromoComponent);
