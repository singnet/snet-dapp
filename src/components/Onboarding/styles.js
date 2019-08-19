export const useStyles = theme => ({
  onboardingContainer: {
    paddingBottom: 40,
    backgroundColor: theme.palette.text.offWhiteColor,
    "& ul": {
      justifyContent: "center",
      "& li": {
        "&:before": { marginLeft: 16 },
      },
    },
  },
  topSection: {
    textAlign: "center",
    "& h2": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 32,
    },
    "& p": {
      margin: "20px 0 0",
      color: theme.palette.text.mediumShadeGray,
      fontSize: 20,
      lineHeight: "30px",
    },
  },
});
