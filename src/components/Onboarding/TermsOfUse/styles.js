export const useStyles = theme => ({
  onboardingContainer: {
    paddingBottom: 40,
    backgroundColor: theme.palette.text.gray8,
  },
  termsOfUseContainer: {
    width: 630,
    paddingBottom: 40,
    margin: "40px auto 0",
    backgroundColor: theme.palette.text.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    textAlign: "center",
    "& h3": {
      padding: "15px 0 15px 25px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.gray1,
      margin: 0,
      color: theme.palette.text.darkShadedGray,
      fontSize: 20,
      textAlign: "left",
    },
    "@media (max-width:724px)": {
      width: "90%",
    },
  },
  termsAndConditions: {
    height: 247,
    margin: "15px 12px 0",
    padding: "9px 7px",
    overflow: "auto",
    fontSize: 14,
    textAlign: "left",
    borderColor: "#f1f1f1",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: theme.palette.text.offWhiteColor,
    "& p": {
      color: theme.palette.text.lightShadedGray,
      lineHeight: "21px",
    },
    "& span": {
      color: theme.palette.text.lightShadedGray,
    },
    "& a": {
      color: theme.palette.text.primary,
      fontWeight: 600,
    },
  },
  checkboxAndButton: {
    padding: "30px 15px 0",
    display: "flex",
    justifyContent: "space-between",
    "& span": {
      color: theme.palette.text.mediumShadeGray,
      fontFamily: theme.typography.primary.main,
      fontSize: 14,
      letterSpacing: 0.25,
      lineHeight: "20px",
    },
    "& button": { padding: "13px 61px 11px" },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
});
