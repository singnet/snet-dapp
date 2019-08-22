export const useStyles = theme => ({
  depositAmtContainer: {
    padding: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,0.32)",
    borderRadius: 4,
    margin: "10px 0 32px",
    "& span": {
      background: theme.palette.text.white,
      color: theme.palette.text.alertBoxColor,
      fontSize: 16,
      letterSpacing: 0.15,
      lineHeight: "24px",
    },
  },
});
