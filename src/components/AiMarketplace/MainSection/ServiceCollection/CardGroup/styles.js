import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  cardCollection: {
    marginTop: 20,
    "@media(max-width: 1023px) and (min-width: 768px)": { textAlign: "center" },
  },
  routerLink: {
    textDecoration: "none ",
    display: "inline-block",
    verticalAlign: "top",
  },
}));
