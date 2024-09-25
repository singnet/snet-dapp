import React from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import InfoIcon from "@mui/icons-material/Info";

import StyledButton from "snet-dapp-components/components/StyledButton";
import { useStyles } from "./styles";
import Price from "./Price";
import { PricingStrategy } from "../../../utility/PricingStrategy";

const PricingDetails = ({ classes, pricing, serviceAvailable, handleDemoClick }) => {
  const price_strategy = new PricingStrategy(pricing);
  const priceInAGI = typeof price_strategy === "undefined" ? undefined : price_strategy.getMaxPriceInAGI();
  const price_model = typeof price_strategy === "undefined" ? undefined : price_strategy.getPriceModel();

  return (
    <Grid item xs={12} sm={12} md={4} lg={4} className={classes.creditsContainer}>
      <div className={classes.creditsAndToken}>
        <Price unit="agix tokens" value={priceInAGI} />
      </div>
      <p>
        <InfoIcon className={classes.infoIcon} />
        <span>{price_model}</span>
      </p>
      <StyledButton
        btnText={!serviceAvailable ? "demo offline" : "demo"}
        onClick={handleDemoClick}
        disabled={!serviceAvailable}
      />
    </Grid>
  );
};

export default withStyles(useStyles)(PricingDetails);
