import React from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import InfoIcon from "@mui/icons-material/Info";

import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";
import Price from "./Price";
import { PricingStrategy } from "../../../utility/PricingStrategy";
import { useSelector } from "react-redux";

const PricingDetails = ({ classes, serviceAvailable, handleDemoClick }) => {
  const pricing = useSelector((state) => state.serviceDetailsReducer.details.pricing);
  const price_strategy = new PricingStrategy(pricing);
  const priceInAGI = typeof price_strategy === "undefined" ? undefined : price_strategy.getMaxPriceInAGI();
  const price_model = typeof price_strategy === "undefined" ? undefined : price_strategy.getPriceModel();

  return (
    <Grid item xs={12} sm={12} md={5} lg={5} className={classes.creditsContainer}>
      <div className={classes.creditsAndToken}>
        <Price unit={`${process.env.REACT_APP_TOKEN_NAME} tokens`} value={priceInAGI} />
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
