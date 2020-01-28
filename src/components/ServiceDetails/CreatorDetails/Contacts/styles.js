export const useStyles = theme => ({
  card: {
    width: 519,
    margin: "0 auto",
    fontSize: 22,
    transform: "translateY(130%)",
    "@media(max-width:520px)": { width: "100%" },
  },
  closeIcon: {
    cursor: "pointer",
    float: "right",
  },
  header: {
    padding: "10px 22px",
    backgroundColor: theme.palette.text.offWhiteColor,
  },
  headerTitle: {
    color: theme.palette.text.darkShadedGray,
    fontFamily: theme.typography.primary.main,
    fontSize: 20,
  },
  listItemText: {
    display: "grid",
    gridTemplateColumns: "30% auto",
    "& span": {
      "&:first-of-type": {
        color: theme.palette.text.mediumShadeGray,
        fontSize: 14,
      },
    },
  },
  anchor: {
    color: theme.palette.text.primary,
    cursor: "pointer",
    fontSize: 16,
    letterSpacing: 0.29,
    textDecoration: "none",
  },
  phoneNo: {
    color: theme.palette.text.darkShadedGray,
    fontSize: 16,
    letterSpacing: 0.29,
    lineHeight: "20px",
  },
  cardContent: {
    padding: "15px 4px",
    "& ul": {
      padding: 0,
      "& li": { padding: "8px 13px" },
    },
  },
});
