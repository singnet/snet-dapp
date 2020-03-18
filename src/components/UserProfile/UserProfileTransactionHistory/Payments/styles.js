export const useStyles = theme => ({
  paymentsContainer: {
    "@media(max-width: 1280px)": { width: 1280 },
  },
  paymentsHeaders: {
    padding: "30px 30px 10px",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "#f6f6f7",
    display: "flex",
    "& p": {
      opacity: 0.53,
      color: theme.palette.text.lightShadedGray,
      fontFamily: theme.typography.primary.main,
      fontSize: 14,
      lineHeight: "18px",
      textTransform: "uppercase",
    },
  },
});
