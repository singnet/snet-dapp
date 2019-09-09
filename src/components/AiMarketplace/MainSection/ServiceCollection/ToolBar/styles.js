import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  toolBar: {
    padding: "10px 0",
    "@media(max-width: 1023px)": { marginTop: 30 },
    "@media(max-width: 768px)": { 
      padding: '10px 15px',
      marginTop: 0
    },
  },
  serviceCollection: { paddingLeft: 25 },
  sortBySection: {
    display: "flex",
    alignItems: "baseline",
    "& svg": { color: theme.palette.text.primary },
  },
  sortbyTxt: {
    padding: "0 17px 0 0",
    color: theme.palette.text.lightShadedGray,
    fontSize: 16,
  },
  servicesCount: {
    color: theme.palette.text.lightShadedGray,
    fontSize: 16,
  },
  searchBar: {
    paddingTop: 10,
    "& div": {
      color: theme.palette.text.mediumShadeGray,
      "&::after": { borderBottomColor: "#9b9b9b !important" },
    },
  },
  iconsContainer: {
    display: "flex",
    alignItems: "center",
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
