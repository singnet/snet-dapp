export const useStyles = theme => ({
  ExpiredSessionContainer: {
    textAlign: "center",
    "& button": {
      marginTop: 36,
      marginRight: "0 !important",
      paddingBottomg: 15,
    },
  },
  PurchaseFlowContainer: { padding: "0 50px 50px" },
  PurchaseFlowDescription: {
    margin: "33px 0 45px",
    color: theme.palette.text.alertBoxColor,
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: "21px",
  },
  paymentInfoCard: {
    marginBottom: 25,
    display: "flex",
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginTop: 35,
    textAlign: "center",
  },
  channelSelectionTitle: {
    marginBottom: 5,
    display: "inline-block",
    color: theme.palette.text.mediumShadeGray,
    fontSize: 16,
    fontWeight: 600,
  },
});
