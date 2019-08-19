import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  pendingSection: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: 20,
    color: theme.palette.text.orange,
    fontWeight: 600,
    "& span": {
      "&::before": {
        fontSize: 14,
      },
    },
  },
}));
