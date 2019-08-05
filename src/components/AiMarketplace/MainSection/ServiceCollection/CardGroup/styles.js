import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  lisViewCardCollection: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    cardCollection: {
      marginTop: 10,
      "@media(max-width: 1023px) and (min-width: 768px)": { textAlign: "center" },
    },
    gridViewCardCollection: { marginTop: 20 },
    routerLink: {
      width: "100%",
      textDecoration: "none ",
      display: "inline-block",
      verticalAlign: "top",
      "& div": { backgroundColor: theme.palette.text.white },
      "&:nth-child(2n)": {
        "& div": { backgroundColor: theme.palette.text.offWhiteColor },
      },
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
  },
}));
