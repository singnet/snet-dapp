export const useStyles = theme => ({
  paymentsDataRow: {
    padding: "18px 30px",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "#f6f6f7",
    display: "flex",
    "& p": {
      color: theme.palette.text.mediumShadeGray,
      fontFamily: theme.typography.primary.main,
      fontSize: 14,
      lineHeight: "18px",
    },
  },
  providersId: { color: "#4086ff !important" },
});
