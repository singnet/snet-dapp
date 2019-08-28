export const useStyles = theme => ({
  pythonMainContainer: {
    "& h2": {
      marginTop: 18,
      color: theme.palette.text.darkShadedGray,
      fontSize: 18,
      fontWeight: 400,
      lineHeight: "23px",
    },
    "& span": {
      margin: "18px 0 10px",
      display: "inline-block",
      color: theme.palette.text.lightShadedGray,
      fontSize: 14,
      letterSpacing: 0.25,
      lineHeight: "20px",
    },
  },
});
