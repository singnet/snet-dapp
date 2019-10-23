export const useStyles = theme => ({
  PaymentInfoCardContainer: {
    display: "inline-block",
    textAlign: "right",
    "& svg": {
      color: theme.palette.text.lightShadedGray,
      fontSize: 18,
      verticalAlign: "middle",
    },
    "& h5": {
      margin: "0 0 0 7px",
      display: "inline-block",
      color: theme.palette.text.lightShadedGray,
      fontSize: 16,
      fontWeight: "normal",
      lineHeight: "20px",
    },
    "& h3": {
      padding: "0 !important",
      borderBottomWidth: "0 !important",
      margin: 0,
      display: "inline-block",
      color: theme.palette.text.darkShadedGray,
      fontSize: "28px !important",
      lineHeight: "28px",
    },
    "@media(max-width:480px)": { textAlign: "left" },
  },
  unit: {
    marginLeft: 8,
    display: "inline-block",
    color: theme.palette.text.lightShadedGray,
    fontSize: 16,
  },
});
