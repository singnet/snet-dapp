import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  header: {
    alignItems: "center",
    display: "flex",
    backgroundColor: theme.palette.text.purple,
    padding: "15px 65px 15px 60px",
    "@media (max-width:1280px)": { padding: "15px 10px" },
    "@media (max-width:768px)": { padding: "15px 22" },
    "@media (max-width:480px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  hamburger: {
    margin: "0 44px 0 28px",
    display: "none",
    cursor: "pointer",
    "& span": {
      width: 18,
      height: 2,
      display: "block",
      backgroundColor: theme.palette.text.white,
      marginBottom: 3,
    },
    "@media (max-width:1024px)": { display: "block" },
    "@media (max-width:768px)": { margin: "0 25px 0 0" },
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
    "& > div": { width: 70 },
    "& .MuiFormLabel-root.Mui-focused": {
      color: theme.palette.text.lightShadedGray,
    },
    "& label": {
      fontSize: 16,
      top: "-17px",
      color: theme.palette.text.lightShadedGray,
      "& + div": {
        margin: 0,
        "& svg": {
          top: "calc(50% - 15px)",
          right: "-35px",
          color: theme.palette.text.lightShadedGray,
          fontSize: 30,
        },
        "&::after": {
          border: "1px solid #fff",
          bottom: "-8px",
        },
      },
      "& option": {
        color: theme.palette.text.white,
      },
    },
  },
  activeTab: {
    paddingBottom: 12,
    fontWeight: theme.typography.fontweight,
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.text.white,
    color: theme.palette.text.white,
  },
  loginBtnsSection: {
    width: "30%",
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
}));
