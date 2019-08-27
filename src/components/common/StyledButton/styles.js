import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  styledButton: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    padding: "13px 28px 11px",
    color: theme.palette.text.white,
    textTransform: "uppercase",
    fontFamily: theme.typography.primary.main,
    fontWeight: 600,
    letterSpacing: "1.25px",
    lineHeight: "16px",
    "&:disabled": {
      backgroundColor: theme.palette.text.lightGray,
      color: theme.palette.text.white,
    },
  },
  blueBg: {
    backgroundColor: theme.backgroundColor.blue,
    "&:hover": { backgroundColor: theme.palette.text.customHoverBlue },
  },
  blackBg: {
    backgroundColor: theme.backgroundColor.githubBlack,
    "& i": {
      fontSize: 24,
      marginRight: 5,
    },
    "&:hover": {
      backgroundColor: theme.backgroundColor.white,
      borderColor: theme.backgroundColor.githubBlack,
      color: theme.backgroundColor.githubBlack,
    },
  },
  transparentBg: {
    backgroundColor: "transparent",
    color: theme.palette.text.primary,
    "&:disabled": {
      color: "#ccc !important",
      backgroundColor: "transparent",
    },
    "&:hover": {
      backgroundColor: "rgba(64,134,255,0.1)",
      color: theme.palette.text.customHoverBlue,
    },
  },
  red: {
    color: theme.palette.text.redBtnText,
    "&:hover": {
      backgroundColor: theme.palette.text.redBtnText,
      color: theme.palette.text.white,
    },
  },
  redBg: {
    padding: "13px 38px 11px",
    color: theme.palette.text.white,
    backgroundColor: theme.palette.text.redBtnBg,
    "&:hover": {
      backgroundColor: theme.palette.text.redBtnText,
      color: theme.palette.text.white,
    },
  },
  transparentBlueBorder: {
    borderColor: theme.palette.text.primary,
    backgroundColor: "transparent !important",
    color: theme.palette.text.primary,
    "&:hover": {
      borderColor: theme.palette.text.transBlueBorderTextHover,
      backgroundColor: "rgba(0,90,203,0.05) !important",
      color: theme.palette.text.transBlueBorderTextHover,
    },
  },
}));
