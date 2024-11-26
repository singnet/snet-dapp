import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  styledButton: {
    minWidth: 170,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    padding: "11px 28px",
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
    backgroundColor: theme.palette.text.redBtnText,
    "&:hover": {
      backgroundColor: theme.palette.text.redBtnBg,
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
    "&:disabled": {
      borderWidth: 2,
      borderColor: theme.palette.text.disabledBtnBg,
      color: theme.palette.text.disabledBtnBg,
    },
  },
  whiteBorder: {
    borderColor: theme.palette.text.white,
    backgroundColor: "transparent",
    color: theme.palette.text.white,
    "&:hover": {
      backgroundColor: "rgba(241,241,241,0.15)",
    },
  },
  gradientBg: {
    background: "linear-gradient(90deg, #8279FE 0%, #449CEE 100%)",
  },
}));
