import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  header: {
    alignItems: "center",
    display: "flex",
    backgroundColor: theme.palette.text.purple,
    padding: "12px 65px 4px 60px",
    "@media (max-width:1280px)": { padding: "13px 10px 3px 10px" },
    "@media (max-width:768px)": { padding: "15px 22" },
    "@media (max-width:480px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  logoSection: {
    width: "30%",
    display: "flex",
    alignItems: "center",
    "@media (max-width:1024px)": { width: "65%" },
  },
  h1: {
    margin: 0,
  },
  logoAnchor: {
    display: "inline-block",
    "& img": {
      width: 172,
    },
  },
  logoIcon: { width: "100%" },
  navigationSection: {
    width: "58%",
    marginBottom: 10,
    "@media (max-width:1024px)": { display: "none" },
  },
  navUl: {
    padding: 0,
    margin: 0,
    display: "flex",
  },
  navLinks: {
    marginRight: 53,
    listStyle: "none",
    "@media (max-width:1280px) and (min-width: 1024px)": {
      marginRight: 26,
    },
  },
  navLinksAnchor: {
    textDecoration: "none",
    fontSize: 16,
    color: theme.palette.text.lightShadedGray,
    lineHeight: "22px",
  },
  navLinksDropDown: {
    listStyle: "none",
    "& select": { color: theme.palette.text.lightShadedGray },
    "& svg": { color: theme.palette.text.lightShadedGray },
  },
  activeTab: {
    paddingBottom: 4,
    fontWeight: theme.typography.fontweight,
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.text.white,
    color: theme.palette.text.white,
  },
  loginBtnsSection: {
    width: "30%",
    marginBottom: 6,
    "@media (max-width:1024px)": { width: "35%" },
    "@media (max-width: 587px)": { width: "50%" },
    "@media (max-width:480px)": {
      width: "100%",
      marginTop: 10,
      display: "flex",
      alignSelf: "flex-end",
    },
  },
  loginBtnsUl: {
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& a": {
      textDecoration: "none",
    },
  },
  loginBtnsLi: {
    marginRight: 30,
    listStyle: "none",
    "& span": {
      "& span": {
        "@media (max-width:768px)": { display: "none" },
      },
    },
  },
  signupBtn: {
    padding: "4px 24px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.palette.text.white,
    borderRadius: 4,
    marginRight: 0,
    cursor: "pointer",
  },
  loginBtnsAnchor: {
    textDecoration: "none",
    fontSize: 16,
    color: theme.palette.text.white,
  },
  signupBtnText: {
    fontWeight: theme.typography.fontweight,
    letterSpacing: 1.79,
    lineHeight: "16px",
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
