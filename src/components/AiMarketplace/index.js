import React, { Component } from "react";

// import components
import Header from "../common/Header/index.js";
import Footer from "../common/Footer/index.js";
import StyledButton from "../common/StyledButton/index.js";
import MainSection from "./MainSection/index.js";

// Material UI imports
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    width: "92%",
    margin: "0 auto"
  },
  titleContainer: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    margin: 0,
    color: theme.palette.text.black1,
    fontSize: 42,
    lineHeight: "57px"
  },
  description: {
    padding: "42px 0 21px",
    margin: 0,
    color: theme.palette.text.black1,
    fontFamily: theme.typography.secondary.main,
    fontSize: 24,
    lineHeight: "29px"
  }
}));

function AiMarketplace() {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <div className={classes.mainWrapper}>
        <Grid container spacing={24}>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
            className={classes.titleContainer}
          >
            <h2 className={classes.title}>AI Marketplace</h2>
          </Grid>
          <Grid item xs={12} sm={9} md={9} lg={9}>
            <p className={classes.description}>
              Want to find the right AI service for your project? You’ve come to
              the right place. <br />
              We’ve got a growing marketplace with hundreds of AI services for
              you to utilize. <br />
              They’re powered by a community of amazing developers from all over
              the globe.
            </p>
            <StyledButton type="blue" btnText="Sign up for free credits" />
          </Grid>
        </Grid>
        <div>
          <MainSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AiMarketplace;
