import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "fixed",
    right: 0,
    left: 0,
    zIndex: 5,
    backgroundColor: theme.palette.text.purple,
    boxShadow: "0 2px 6px 0 rgba(0,0,0,0.3)",
  },
  updateNotificationBar: {
    width: "100%",
  },
  mainHeader: {
    boxSizing: "border-box",
    width: "100%",
    justifyContent: "space-between",
    padding: "14px 60px",
    display: "flex",
    alignItems: "center",
    gap: 20,
    "@media (max-width:1024px)": {},
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  mainPortalButton: {
    "@media (max-width:1024px)": { display: "none" },
  },
  h1: {
    margin: 0,
    "& a": { textDecoration: "none" },
    "& span": {
      "&:before": { fontSize: 45 },
    },
  },
  logoAnchor: {
    display: "flex",
    "& img": { width: 172 },
  },
  logoIcon: { width: "100%" },
  navigationSection: {
    "@media (max-width:1024px)": { display: "none" },
  },
  loginBtnsSection: {
    "@media (max-width:578px)": { display: "none" },
  },
  headerDropDown: {
    "& > div": {
      display: "flex",
      alignItems: "flex-start",
    },
    "& a": {
      textDecoration: "none",
    },
    "& button": {
      textTransform: "none",
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
    alignItems: "center",
    gap: 20,
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
    listStyle: "none",
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
