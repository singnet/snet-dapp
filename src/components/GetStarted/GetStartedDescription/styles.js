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
      fontSize: 20,
      lineHeight: "30px",
      "@media(max-width:1024px)": { marginTop: 10 },
    },
    "& button": {
      padding: "13px 16% 11px",
      marginTop: 16,
    },
  },
});
