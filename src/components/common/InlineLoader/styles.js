import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  pendingSection: {
    marginBottom: 20,
    color: theme.palette.text.orange,
    fontWeight: theme.typography.fontweight,
    "& span": {
      "&::before": {
        fontSize: 14,
      },
    },
  },
}));
