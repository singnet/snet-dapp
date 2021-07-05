import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "fixed",
    right: 0,
    left: 0,
    zIndex: 5,
  },
  updateNotificationBar: {
    width: "100%",
  },
  mainHeader: {
    boxSizing: "border-box",
    width: "100%",
    padding: "14px 65px 13px 60px",
    display: "flex",
    alignItems: "center",
    "@media (max-width:768px)": { padding: "14px 65px 13px 0" },
  },
  logoSection: {
    width: "30%",
    display: "flex",
    alignItems: "center",
    lineHeight: 0,
    "& > span": {
      marginLeft: 13,
      color: theme.palette.text.white,
      fontSize: 22,
      fontWeight: 200,
      letterSpacing: -0.68,
      lineHeight: "28px",
      textAlign: "center",
    },
    "@media (max-width:1024px)": { width: "40%" },
  },
  h1: {
    margin: 0,
    "& a": { textDecoration: "none" },
    "& span": {
      "&:before": { fontSize: 45 },
    },
  },
  logoAnchor: {
    display: "inline-block",
    "& img": { width: 172 },
  },
  logoIcon: { width: "100%" },
  navigationSection: {
    width: "58%",
    "@media (max-width:768px)": { display: "none" },
  },
  navUl: {
    padding: 0,
    margin: 0,
    display: "flex",
    "& a": {
      width: "auto",
      padding: 0,
      marginRight: 40,
      "& span": {
        color: theme.palette.text.white,
        fontFamily: theme.typography.primary.main,
        fontSize: 16,
        fontWeight: 200,
        lineHeight: "20px",
      },
      "&:hover": {
        "& div": {
          "& span": { fontWeight: 400 },
        },
      },
    },
  },
}));
