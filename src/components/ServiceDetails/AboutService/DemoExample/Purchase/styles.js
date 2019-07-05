export const useStyles = theme => ({
  purchaseContainer: {
    padding: "30px 0",
  },
  selectBox: {
    width: 450,
    margin: "0 0 0 35px",
    "& .MuiSelect-root": {
      color: theme.palette.text.black1,
      fontFamily: theme.typography.primary.main,
    },
  },
  unitAmtPriceTotalContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 7,
    marginTop: 40,
    "& div": {
      display: "flex",
      alignItems: "center",
      "& span": {
        fontSize: 18,
        color: theme.palette.text.primary,
        marginRight: 10,
      },
      "& div": {
        width: 170,
        margin: 0,
      },
    },
  },
  priceTotal: {
    "& div": {
      width: "468px !important",
    },
  },
  demoContainerButtons: {
    textAlign: "center",
  },
});
