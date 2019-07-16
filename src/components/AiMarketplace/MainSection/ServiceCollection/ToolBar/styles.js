import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  serviceCollection: {
    paddingLeft: 25,
  },
  sortBySection: {
    display: "flex",
    alignItems: "flex-end",
    "& svg": { color: theme.palette.text.primary },
  },
  sortbyTxt: {
    padding: "0 17px 5px 0",
    color: theme.palette.text.lightShadedGray,
    fontSize: 16,
  },
  servicesCount: {
    color: theme.palette.text.lightShadedGray,
    fontSize: 16,
  },
  searchBar: {
    "& div": {
      color: theme.palette.text.mediumShadeGray,
      "&::after": {
        borderBottomColor: "#9b9b9b !important",
      },
    },
  },
  iconsContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    "& button": {
      border: "none",
      paddingLeft: 12,
      backgroundColor: "transparent",
      outline: "none",
      cursor: "pointer",
      "& span": {
        color: theme.palette.text.lightShadedGray,
        fontSize: 17,
      },
    },
  },
}));
