export const useStyles = theme => ({
  purchaseErrorContainer: {
    padding: "0 25px",
    "& p": { margin: "10px 0 0" },
  },
  btnContainer: {
    marginTop: 35,
    textAlign: "center",
  },
  purchaseContainer: { paddingBottom: 0 },
  purchaseDesc: {
    padding: "0 100px",
    fontFamily: theme.typography.primary.main,
    fontSize: 14,
    color: theme.palette.text.mediumShadeGray,
    letterSpacing: 0.25,
    textAlign: "center",
    lineHeight: "20px",
    "@media(max-width:480px)": { padding: 0 },
  },
  circularProgressContainer: {
    padding: "30px 0 33px",
    textAlign: "center",
    "& div": {
      width: "48px !important",
      height: "48px !important",
      color: theme.palette.text.primary,
    },
  },
  circularProgress: { display: "inline-block" },
});
