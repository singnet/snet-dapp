import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    margin: "200px auto 0",
    textAlign: "center",
    "& h2": {
      padding: "6px 0",
      color: theme.palette.text.darkShadedGray,
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: 0.32,
      lineHeight: "24px",
    },
    "& p": {
      paddingTop: 5,
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      letterSpacing: 0.25,
      lineHeight: "20px",
    },
  },
  circularProgressContainer: {
    paddingTop: 20,
    textAlign: "center",
    "& div": { color: theme.palette.text.primary },
  },
  circularProgress: { display: "inline-block" },
}));
