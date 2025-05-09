import React, { Fragment } from "react";
import { withStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useStyles } from "./styles";
import Routes from "../../../../utility/constants/Routes";
import newAIServiceDetailsPageIcon from "../../../../assets/images/newAIServiceDetailsPageIcon.svg";

const PromoBox = ({ classes }) => {
  return (
    <Fragment>
      <div className={classes.backToLink}>
        <ArrowBackIcon />
        <Link to={`/${Routes.AI_MARKETPLACE}`}>Back to AI Marketplace</Link>
      </div>
      <div className={classes.promoContainer}>
        <img src={newAIServiceDetailsPageIcon} alt="Looking for New AI Service" />
        <div>
          <span>Looking for a different AI Service?</span>
          <p>
            If you have a need for a specific AI service, we would love to know! We will discuss the details with you or
            use your suggestion to incentivize our network.
          </p>
          <a href={`/${Routes.AI_REQUEST_FORM}`} title="Request AI Form" target="_blank" rel="noreferrer">
            request ai form
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default withStyles(useStyles)(PromoBox);
