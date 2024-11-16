import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { useStyles } from "./styles";

export const AppLoader = ({ loading, loaderHeader, loaderText }) => {
  const classes = useStyles();

  return (
    <Modal open={loading}>
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

AppLoader.propTypes = {
  loading: PropTypes.bool,
  loaderHeader: PropTypes.string,
  loaderText: PropTypes.string,
};

const mapStateToProps = (state) => {
  const { app } = state.loaderReducer;
  return { ...app };
};

export default connect(mapStateToProps)(AppLoader);
