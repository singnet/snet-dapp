import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  toolBar: {
    padding: "0 0 10px",
    "@media(max-width: 1023px)": { marginTop: 30 },
    "@media(max-width: 768px)": {
      padding: "10px 15px",
      marginTop: 0,
    },
    "@media(max-width: 480px)": {
      flexDirection: "column-reverse",
      alignItems: "flex-start",
    },
  },
  serviceCollection: { paddingLeft: 25 },
  sortBySection: {
    display: "flex",
    alignItems: "baseline",
    "& svg": { color: theme.palette.text.primary },
    "& .MuiSelect-selectMenu": { color: theme.palette.text.primary },
  },
  sortbyTxt: {
    padding: "0 17px 0 0",
    color: theme.palette.text.lightShadedGray,
    fontSize: 16,
  },
  servicesCount: {
    color: theme.palette.text.lightShadedGray,
    fontSize: 16,
    "&::after": {
      content: "' '",
      width: 2,
      height: 15,
      marginLeft: 10,
      display: "inline-block",
      backgroundColor: theme.palette.text.lightShadedGray,
      verticalAlign: "middle",
      "@media(max-width: 480px)": { display: "none" },
    },
  },
  searchBar: {
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
      paddingLeft: 19,
      backgroundColor: "transparent",
      outline: "none",
      cursor: "pointer",
      "& span": {
        color: theme.palette.text.lightShadedGray,
        fontSize: 17,
      },
    },
    "@media(max-width: 480px)": {
      width: "100%",
      marginBottom: 15,
      justifyContent: "space-between",
    },
  },
}));
