export const useStyles = theme => ({
  SingleFeatureWrapper: {
    width: 302,
    marginBottom: 20,
    display: "flex",
    "& svg": { color: theme.palette.text.green },
    "& div": {
      marginLeft: 16,
      textAlign: "left",
    },
    "& h4": {
      margin: 0,
      color: theme.palette.text.mediumShadeGray,
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: 0.32,
      lineHeight: "20px",
    },
    "& p": {
      color: theme.palette.text.mediumShadeGray,
      margin: "7px 0 0",
      fontSize: 16,
      letterSpacing: 0.29,
      lineHeight: "20px",
    },
  },
});
