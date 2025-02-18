export const useStyles = (theme) => ({
  ExpiredSessionContainer: {
    textAlign: "center",
    "& button": {
      margin: "0 auto",
      paddingBottomg: 15,
    },
  },
  runServiceContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 25,
  },
  PurchaseFlowContainer: {
    "@media(max-width:1280px)": { padding: 0 },
  },
  channelSelectionTitle: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    marginBottom: 10,
  },
  PurchaseFlowDescription: {
    margin: "33px 0 45px",
    color: theme.palette.text.alertBoxColor,
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: "21px",
  },
  paymentInfoCard: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 25,
    "@media(max-width:650px)": { justifyContent: "center" },
  },
  paymentChannelDropDownContainer: { display: "flex" },
  infoIconContainer: {
    marginRight: 10,
    alignSelf: "center",
    color: theme.palette.text.lightShadedGray,
    fontSize: 20,
  },
  paymentChannelDropDown: {
    width: 278,
    padding: "0 10px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(25,25,25,0.32)",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    position: "relative",
    "& .MuiFormControl-root": { width: "90%" },
  },
  dropDownTitle: {
    padding: "0 5px",
    position: "absolute",
    top: -9,
    left: 10,
    backgroundColor: theme.palette.text.white,
    color: theme.palette.text.dialogTitle,
    fontSize: 12,
    letterSpacing: 0.4,
  },
  walletIcon: { color: theme.palette.text.lightShadedGray },
  buttonContainer: {
    textAlign: "center",
    display: "flex",
    justifyContent: "space-evenly",
    "& div": {
      display: "inline-block",
    },
  },
  tooltip: { fontSize: 14 },
});
