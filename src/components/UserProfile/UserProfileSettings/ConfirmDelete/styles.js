import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  card: {
    margin: "0px auto",
    maxWidth: 500,
  },
  btnContainer: {
    width: "100% !important",
    display: "flex",
    justifyContent: "space-between",
  },
  formControl: {
    width: "100%",
  },
}));
