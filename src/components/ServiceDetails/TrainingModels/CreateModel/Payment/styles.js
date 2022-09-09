export const useStyles = theme => ({
  paymentContaienr: {
    padding: "60px 24px 32px",
  },
  reviewReqContainer: {
    "& > span": { fontWeight: "bold" },
    "& span": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 14,
      lineHeight: "18px",
    },
    "& > div": {
      marginTop: 16,
      display: "flex",
      alignItems: "flex-start",
      "& p": {
        display: "flex",
        color: theme.palette.text.mediumShadeGray,
        fontFamily: "Muli",
        fontSize: 14,
        fontWeight: 300,
        lineHeight: "24px",
        "& svg": {
          marginLeft: 16,
          color: theme.palette.text.darkShadedGray,
        },
      },
      "& a": {
        color: theme.palette.text.primary,
        fontWeight: 400,
        textDecoration: "none",
      },
      "& ul": {
        margin: 0,
        padding: 0,
        listStyle: "none",
        "& li": {
          paddingBottom: 8,
          color: theme.palette.text.mediumShadeGray,
          fontFamily: "Muli",
          fontSize: 14,
          fontWeight: 300,
          lineHeight: "24px",
          "&:lastof-type": { paddingBottom: 0 },
        },
      },
    },
  },
  modelTrainFeeContainer: {
    marginTop: 50,
    "& > span": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 14,
      fontWeight: "bold",
      lineHeight: "18px",
    },
    "& > p": {
      margin: "16px 0",
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      fontWeight: 300,
      lineHeight: "24px",
    },
  },
  tokenCount: {
    width: 166,
    padding: "24px 0",
    border: "1px solid #DAF0FF",
    borderRadius: 4,
    backgroundColor: "#E7F5FF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& span": {
      "&:first-of-type": {
        color: theme.palette.text.mediumShadeGray,
        fontSize: 14,
        fontWeight: 300,
        lineHeight: "18px",
        textTransform: "capitalize",
      },
      "&:last-of-type": {
        color: theme.palette.text.darkShadedGray,
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: "25px",
      },
    },
  },
  paymentMode: {
		marginTop: 24,
    "& p": {
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      fontWeight: 300,
      lineHeight: "18px",
    },
  },
});
