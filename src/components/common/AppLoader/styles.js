import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    margin: "0 auto",
  },
  circularProgressContainer: {
    height: 100,
    textAlign: "center",
  },
  circularProgress: {
    display: "inline-block",
  },
}));
