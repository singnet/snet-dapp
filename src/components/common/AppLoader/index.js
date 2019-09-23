import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Modal from "@material-ui/core/Modal";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { useStyles } from "./styles";

export const AppLoader = ({ loading, loaderHeader, loaderText }) => {
  const classes = useStyles();

  return (
    <Modal disableBackdropClick open={loading}>
      <Card className={classes.card}>
        <CardHeader title={<h2>{loaderHeader}</h2>} />
        <Divider />
        <div className={classes.circularProgressContainer}>
          <CircularProgress className={classes.circularProgress} />
        </div>
        <CardContent>
          <Typography variant="body2" component="p">
            {loaderText}
          </Typography>
        </CardContent>
      </Card>
    </Modal>
  );
};

const mapStateToProps = state => {
  const { app } = state.loaderReducer;
  return { ...app };
};

export default connect(mapStateToProps)(AppLoader);
