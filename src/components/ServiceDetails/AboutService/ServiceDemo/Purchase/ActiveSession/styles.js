export const useStyles = (theme) => ({
  activeSessionContainer: {
    textAlign: "center",
    gap: 30,
    display: "flex",
    flexDirection: "column",
    "& > div": { textAlign: "center" },
    "& button": {
      padding: "13px 50px 11px",
      marginRight: "0 !important",
    },
    "& p": {
      margin: 0,
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
  activeSectionButtons: {
    display: "flex",
    gap: 20,
    justifyContent: "center",
  },
});
