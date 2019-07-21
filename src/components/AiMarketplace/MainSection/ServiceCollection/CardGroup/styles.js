import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  cardCollection: {
    marginTop: 20,
    "@media(max-width: 1023px) and (min-width: 768px)": { textAlign: "center" },
  },
  routerLink: {
    width: "100%",
    textDecoration: "none ",
    display: "inline-block",
    verticalAlign: "top",
  },
  circularProgressContainer: {
    paddingTop: 20,
    textAlign: "center",
    height: 500,
    display: "table",
    width: "100%",
    "& div": {
      color: theme.palette.text.primary,
    },
  },
  loaderChild: {
    display: "table-cell",
    verticalAlign: "middle",
    margin: "0 auto",
  },
  circularProgress: {
    display: "inline-block",
    width: 48,
    height: 48,
  },
  loaderText: {
    color: theme.palette.text.lightShadedGray,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.25,
  },
}));
