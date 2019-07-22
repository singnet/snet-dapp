import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  ratedCount: {
    marginLeft: 10,
    display: "inline-block",
    color: theme.palette.text.lightShadedGray,
    fontSize: 12,
    fontWeight: theme.typography.fontweight,
    letterSpacing: 2,
    verticalAlign: "super",
  },
}));
