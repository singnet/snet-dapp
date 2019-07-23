export const useStyles = theme => ({
  onboardingContainer: {
    paddingBottom: 40,
    backgroundColor: theme.palette.text.offWhiteColor,
  },
  topSection: {
    textAlign: "center",
    "& h2": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 32,
      fontWeight: theme.typography.fontweight,
    },
    "& p": {
      margin: "20px 0 0",
      color: theme.palette.text.mediumShadeGray,
      fontFamily: theme.typography.secondary.main,
      fontSize: 20,
      lineHeight: "30px",
    },
  },
});
