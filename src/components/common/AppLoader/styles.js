import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  appLoader: {
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    position: "fixed",
  },
  circularProgress: {
    position: "fixed",
    top: "50%",
    left: "50%",
  },
}));
