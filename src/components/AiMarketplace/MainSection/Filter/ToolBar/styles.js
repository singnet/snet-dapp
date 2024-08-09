import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  toolBar: {
    padding: 20,
    maxWidth: "80vw",
    margin: "0 auto",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(155,155,155,0.9);",
    "@media(max-width: 768px)": {
      padding: "10px 15px",
    },
    "@media(max-width: 480px)": {
      maxWidth: "auto",
      alignItems: "flex-start",
    },
  },
  sortDropdownsContainer: {
    display: "flex",
    alignItems: "center",
  },
  serviceCollection: { paddingLeft: 25 },
  sortBySection: {
    display: "flex",
    gap: 20,
    justifyContent: "space-between",
    "& svg": {
      color: theme.palette.text.primary,
      right: "0 !important",
    },
    "& fieldset": { display: "none" },
    "& .MuiSelect-selectMenu": {
      padding: "0 30px 0 0",
      color: theme.palette.text.primary,
    },
    "@media(max-width: 768px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 0,
    },
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
    minHeight: 34,
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
        fontSize: 18,
      },
    },
    "@media(max-width: 480px)": {
      width: "100%",
      justifyContent: "space-between",
    },
  },
}));
