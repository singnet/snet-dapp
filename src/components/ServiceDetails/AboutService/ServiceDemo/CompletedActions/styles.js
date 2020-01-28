import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  buttonsContainer: {
    marginTop: 10,
    textAlign: "center",
    "& button": {
      padding: " 13px 60px 11px",
      marginTop: 10,
      marginRight: "0 !important",
    },
  },
}));
