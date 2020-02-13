import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";

import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";
import Price from "./Price";
import { PricingStrategy } from "../../../utility/PricingStrategy";
import Routes from "../../../utility/constants/Routes";

const PricingDetails = ({ classes, pricing, handleTabChange, history, activeTab, serviceAvailable }) => {
  const price_strategy = new PricingStrategy(pricing);
  const priceInAGI = typeof price_strategy === "undefined" ? undefined : price_strategy.getMaxPriceInAGI();
  const price_model = typeof price_strategy === "undefined" ? undefined : price_strategy.getPriceModel();

  const handleClick = () => {
    history.push({ ...history.location, hash: Routes.hash.SERVICE_DEMO });
    if (activeTab === 0) {
      window.scroll({
        top: 520,
        behavior: "smooth",
      });
      return;
    }
    handleTabChange(0);
  };

  return (
    <Grid item xs={12} sm={12} md={4} lg={4} className={classes.creditsContainer}>
      <div className={classes.creditsAndToken}>
        <Price unit="agi tokens" value={priceInAGI} />
      </div>
      <p>
        <InfoIcon className={classes.infoIcon} />
        <span>{price_model}</span>
      </p>
      <StyledButton
        btnText={!serviceAvailable ? "demo offline" : "demo"}
        onClick={handleClick}
        disabled={!serviceAvailable}
      />
    </Grid>
  );
};

export default withStyles(useStyles)(PricingDetails);
