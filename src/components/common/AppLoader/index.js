import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";

import { useStyles } from "./styles";
import SNETDialog from "../SNETDialog";

export const AppLoader = ({ loading, loaderHeader, loaderText }) => {
  const classes = useStyles();

  return (
    <SNETDialog
      disableBackdropClick
      disableEscapeKeyDown
      isDialogOpen={loading}
      showCloseButton={false}
      title={loaderHeader}
    >
      <div className={classes.circularProgressContainer}>
        <CircularProgress className={classes.circularProgress} />
      </div>
      <Typography variant="body2" component="p">
        {loaderText}
      </Typography>
    </SNETDialog>
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
