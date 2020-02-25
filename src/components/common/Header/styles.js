import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  header: {
    padding: "13px 65px 6px 60px",
    display: "flex",
    alignItems: "center",
    position: "fixed",
    right: 0,
    left: 0,
    zIndex: 5,
    backgroundColor: theme.palette.text.purple,
    boxShadow: "0 2px 6px 0 rgba(0,0,0,0.3)",
    "@media (max-width:1280px)": { padding: "13px 10px 3px 10px" },
  },
  logoSection: {
    width: "30%",
    display: "flex",
    alignItems: "center",
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
    marginBottom: 10,
    "@media (max-width:1024px)": { display: "none" },
  },
  headerDropDown: {
    "& > div": {
      display: "flex",
      alignItems: "flex-start",
    },
    "&:hover": {
      "& button": { color: theme.palette.text.white },
      "& svg": { color: theme.palette.text.white },
    },
  },
  navUl: {
    padding: 0,
    margin: 0,
    display: "flex",
    "& button": {
      padding: 0,
      color: "#9b9b9b",
      fontFamily: theme.typography.primary.main,
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "22px",
    },
    "& svg": {
      paddingLeft: 5,
      color: "#9b9b9b",
      cursor: "pointer",
    },
  },
  navLinks: {
    marginRight: 53,
    listStyle: "none",
    "@media (max-width:1280px) and (min-width: 1024px)": { marginRight: 26 },
    "& a": {
      textDecoration: "none",
      fontSize: 16,
      color: theme.palette.text.lightShadedGray,
      lineHeight: "22px",
      "&:hover": { color: theme.palette.text.white, textDecoration: "none" },
    },
  },
  navLinksDropDown: {
    listStyle: "none",
    "& select": { color: theme.palette.text.lightShadedGray },
    "& svg": { color: theme.palette.text.lightShadedGray },
  },
  activeTab: {
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.text.white,
    color: "#fff !important",
    fontWeight: 600,
  },
  loginBtnsSection: {
    width: "30%",
    marginBottom: 6,
    "@media (max-width:1024px)": { width: "59%" },
  },
  loginBtnsUl: {
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& a": { textDecoration: "none" },
  },
  loginBtnsLi: {
    marginRight: 30,
    listStyle: "none",
    "& span": {
      "& span": {
        "@media (max-width:768px)": { display: "none" },
      },
    },
    "@media (max-width:550px)": { display: "none" },
  },
  signupBtn: {
    padding: "4px 24px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.palette.text.white,
    borderRadius: 4,
    marginRight: 0,
    cursor: "pointer",
    "&:hover": { backgroundColor: theme.palette.text.outlinedBtnHoverBg },
  },
  loginBtnsAnchor: {
    textDecoration: "none",
    fontSize: 16,
    color: theme.palette.text.white,
    cursor: "pointer",
    "&:hover": {
      paddingBottom: 4,
      borderBottomWidth: "2px",
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.white,
      fontWeight: 600,
    },
  },
  loginBtn: {
    "&:hover": { fontWeight: 400 },
  },
  signupBtnText: {
    fontWeight: 600,
    letterSpacing: 1.79,
    lineHeight: "16px",
    "&:hover": { borderBottom: "none" },
  },
  UppercaseText: { textTransform: "uppercase" },
  loggedInActions: {
    "& span": {
      color: theme.palette.text.lightShadedGray,
      fontSize: 19,
      verticalAlign: "-webkit-baseline-middle",
      "&:last-of-type": {
        paddingLeft: 18,
        cursor: "pointer",
        fontSize: 35,
      },
    },
  },
}));
