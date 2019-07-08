import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  cardCollection: {
    marginTop: 20,
  },
  routerLink: {
    "& a,span": {
      textDecoration: "none !important",
    },
  },
}));
