export const useStyles = theme => ({
  FreeApiCallsData: {
    marginTop: 30,
    textAlign: "center",
    "& > div": { textAlign: "center" },
    "& button": {
      padding: "13px 50px 11px",
      marginTop: 30,
      marginRight: "0 !important",
    },
  },
  FreeApiCallsText: {
    display: "block",
    color: theme.palette.text.lightShadedGray,
    fontSize: 12,
    lineHeight: "17px",
    textTransform: "uppercase",
  },
  ReaminaingCallsNo: {
    color: theme.palette.text.darkShadedGray,
    fontSize: 24,
    fontWeight: 600,
    lineHeight: "33px",
  },
  tooltip: {
    fontSize: 14,
  },
});
