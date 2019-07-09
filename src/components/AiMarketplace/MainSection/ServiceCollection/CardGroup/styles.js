import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  lisViewCardCollection: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
  },
  gridViewCardCollection: { marginTop: 20 },
  routerLink: {
    display: "inline-block",
    verticalAlign: "top",
    textDecoration: "none",
    "& div": { backgroundColor: theme.palette.text.white },
    "&:nth-child(2n)": {
      "& div": { backgroundColor: theme.palette.text.offWhiteColor },
    },
  },
}));
