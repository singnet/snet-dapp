export const useStyles = (theme) => ({
  deatilsTabDesc: {
    marginTop: 32,
    color: theme.palette.text.mediumShadeGray,
  },
  paymentTypeContainer: {
    width: 200,
    margin: "0 auto",
    "& svg": {
      width: "100%",
      height: "100%",
    },
  },
  purchaseAmtTextfield: {
    width: "100%",
    textAlign: "center",
    "& > div": {
      width: "100%",
      maxWidth: 500,
    },
  },
  currencyAdornment: {
    paddingRight: 10,
  },
  paymentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
  },
});
