export const useStyles = (theme) => ({
  // modelDataContaienr: { padding: "60px 33px 24px 24px" },
  createDatasetContainer: {
    "& > span": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 14,
      lineHeight: "18px",
    },
    "& p": {
      margin: "8px 0 40px",
      color: theme.palette.text.mediumShadeGray,
      fontSize: 16,
      fontWeight: 300,
      "& span": {
        fontWeight: 600,
      },
    },
    "& div": {
      width: 180,
      paddingTop: 30,
      borderRadius: 4,
      margin: "0 auto",
      backgroundColor: theme.palette.text.white,
      boxShadow: "0 0 2px 0 rgba(0,0,0,0.15), 0 1px 2px 0 rgba(0,0,0,0.15)",
      textAlign: "center",
      "& > span": {
        margin: "13px 0 16px",
        display: "block",
        color: theme.palette.text.mediumShadeGray,
        fontSize: 12,
        fontWeight: 300,
        lineHeight: "15px",
      },
      "& button": {
        width: "100%",
        padding: "11px 18px",
        borderRadius: 0,
        "& span": { textTransform: "capitalize" },
      },
    },
  },
  uploadDatasetContainer: {
    "& > span": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 14,
      fontWeight: "bold",
      lineHeight: "18px",
    },
  },
  btnContainer: {
    marginTop: 40,
    textAlign: "center",
  },
});
