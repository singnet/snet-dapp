export const useStyles = theme => ({
  UserProfilePopUpContainer: {
    width: 400,
    borderRadius: 4,
    position: "absolute",
    top: 10,
    right: 60,
    backgroundColor: theme.palette.text.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    zIndex: 1,
    "@media(max-width: 769px)": {
      width: "100%",
      height: "100vh",
      top: 0,
      right: 0,
      left: 0,
    },
  },
  UserProfilePopUpHeader: {
    padding: "15px 25px",
    borderBottom: 1,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.text.lightGray,
  },
  Userdetails: {
    display: "flex",
    marginBottom: 10,
    "& span": {
      color: theme.palette.text.lightShadedGray,
      fontSize: 66,
    },
    "& div": {
      marginLeft: 22,
      "& h4": {
        fontWeight: 600,
        margin: 0,
        color: theme.palette.text.black1,
        lineHeight: "27px",
        fontSize: 20,
      },
      "& a": {
        color: theme.palette.text.lightShadedGray,
        fontSize: 16,
        lineHeight: "22px",
        textDecoration: "none",
      },
    },
  },
  creditsRemaining: {
    lineHeight: "16px",
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
  styledProgressBar: {
    height: 10,
    margin: "9px 0 5px",
    backgroundColor: "rgba(64, 134, 255, 0.3)",
    "& div": {
      backgroundColor: theme.palette.text.primary,
    },
  },
  usedCredits: {
    color: theme.palette.text.lightShadedGray,
    fontSize: 14,
    letterSpacing: 1.75,
    lineHeight: "16px",
  },
  loggedInActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& span": {
      cursor: "pointer",
      "&:first-of-type": {
        marginRight: 18,
        color: theme.palette.text.lightShadedGray,
        fontSize: 19,
        display: "none",
      },
      "&:last-of-type": {
        color: theme.palette.text.lightShadedGray,
        fontSize: 35,
        "&:hover": { color: theme.palette.text.white },
      },
    },
  },
});
