export const useStyles = theme => ({
  errorMsgContainer: {
    width: "100%",
    margin: "40px 0 60px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    "& > span": {
      color: theme.palette.text.mediumShadeGray,
      fontSize: 24,
      fontWeight: 200,
      lineHeight: "30px",
    },
  },
  btnContainer: {
    "& p": {
      margin: "30px 0 16px",
      color: theme.palette.text.lightShadedGray,
      fontSize: 14,
      lineHeight: "18px",
    },
    "& button": { fontWeight: 600 },
  },
});
