export const useStyles = theme => ({
  summaryContainer: { padding: "0 25px !important" },
  successMsg: {
    paddingBottom: 20,
    color: theme.palette.text.successBoxBorder,
    fontFamily: theme.typography.primary.main,
    fontSize: 16,
    fontWeight: 600,
  },
  summaryTable: { paddingTop: 25 },
  summaryTableHeader: {
    color: theme.palette.text.mediumShadeGray,
    fontFamily: theme.typography.primary.main,
    fontSize: 16,
    fontWeight: 600,
  },
});
