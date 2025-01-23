export const useStyles = (theme) => ({
  onboardingContainer: {
    height: "calc(100vh - 165px)",
    paddingBottom: 40,
    backgroundColor: theme.palette.text.offWhiteColor,
    "& ul": {
      justifyContent: "center",
      "& li": {
        "&:before": { marginLeft: 16 },
      },
    },
  },
  onboardingComponentsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
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
