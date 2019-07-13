import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { useStyles } from "./styles";

const AppLoader = ({ loading }) => {
  const classes = useStyles();
  if (!loading) {
    return null;
  }
  return (
    <div className={classes.appLoader}>
      <CircularProgress className={classes.circularProgress} />
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.loaderReducer.app,
});

export default connect(mapStateToProps)(AppLoader);
