export const useStyles = theme => ({
  GetStartedDescription: {
    "& h2": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 32,
      fontWeight: 600,
      lineHeight: "48px",
    },
    "& p": {
      margin: "20px 0 0",
      color: theme.palette.text.mediumShadeGray,
      fontFamily: theme.typography.secondary.main,
      fontSize: 20,
      lineHeight: "30px",
    },
    "& button": {
      padding: "13px 16% 11px",
      marginTop: 16,
    },
  },
});
