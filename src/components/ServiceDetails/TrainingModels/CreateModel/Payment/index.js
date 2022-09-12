import React from "react";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import { useStyles } from "./styles";
import PaymentMode from "./PaymentMode";

const Payment = ({ classes }) => {

  const addEllipsisAtEndOfString = str => `${str.substr(0, 40)}...`;

  return (
    <div className={classes.paymentContaienr}>
      <div className={classes.reviewReqContainer}>
        <span>Review request</span>
        <Grid container>
          <Grid item xs={3}>
            <span>Default Model:</span>
          </Grid>
          <Grid item xs={9}>
            <Typography>Yes</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <span>Model name:</span>
          </Grid>
          <Grid item xs={9}>
            <Typography>
              Animal detection
              <EditOutlinedIcon />
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <span>Model description:</span>
          </Grid>
          <Grid item xs={9}>
            <Typography>
              Helping wildlife researchers in studying the wild animal species collectively and making strategies to
              protect them. Artificial intelligence tracks wildlife patterns and predicts the extinction of endangered
              animal species.
              <EditOutlinedIcon />
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <span>Data set name:</span>
          </Grid>
          <Grid item xs={9}>
            <Typography>
              Butterflies & Caterpillers
              <EditOutlinedIcon />
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <span>Data files:</span>
          </Grid>
          <Grid item xs={9}>
            <Typography>
              <a href="#" title="Zipped File Name">
                https://www.littlebigfiles.com/file234565432123454321.zip
              </a>
              <EditOutlinedIcon />
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <span>Access for this model:</span>
          </Grid>
          <Grid item xs={9}>
            <Typography>
              Public(5)
              <EditOutlinedIcon />
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <span>Cardano ID:</span>
          </Grid>
          <Grid item xs={9}>
            <ul>
              <li>{addEllipsisAtEndOfString("456iorkjahfjouo23eyu3o2u01982409un9u092")}</li>
              <li>{addEllipsisAtEndOfString("456iorkjahfjouo23eyu3o2u01982409un9u092")}</li>
              <li>{addEllipsisAtEndOfString("456iorkjahfjouo23eyu3o2u01982409un9u092")}</li>
              <li>{addEllipsisAtEndOfString("456iorkjahfjouo23eyu3o2u01982409un9u092")}</li>
              <li>{addEllipsisAtEndOfString("456iorkjahfjouo23eyu3o2u01982409un9u092")}</li>
            </ul>
          </Grid>
        </Grid>
      </div>
      <div className={classes.modelTrainFeeContainer}>
        <span>Model Traning Fee</span>
        <p>This AI Model Traning requires a very small fee. Please select a payment method to continue</p>
        <div className={classes.tokenCount}>
          <span>agix tokens</span>
          <span>0.002</span>
        </div>
      </div>
      <PaymentMode />
    </div>
  );
};

export default withStyles(useStyles)(Payment);
