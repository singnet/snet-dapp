export const useStyles = theme => ({
  styledTable: { paddingTop: 20 },
  styledTableHeader: {
    color: theme.palette.text.mediumShadeGray,
    fontFamily: theme.typography.primary.main,
    fontSize: 16,
    fontWeight: 600,
  },
  styledTableContent: {
    padding: "15px 20px",
    borderRadius: 4,
    margin: "5px 0 25px",
    backgroundColor: theme.palette.text.cardBackground,
    "& > div": {
      paddingRight: 25,
      borderBottom: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.lightGray,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& div": { display: "flex" },
      "& p": {
        color: theme.palette.text.mediumShadeGray,
        fontFamily: theme.typography.primary.main,
        fontSize: 14,
        lineHeight: "40px",
      },
    },
    "& > div:first-of-type": { paddingTop: 0 },
    "& > div:last-of-type": {
      paddingBottom: 0,
      borderBottom: 0,
    },
  },
  styledTableColumn: {
    padding: "0 25px !important",
    "& p": {
      "&:first-of-type": { fontWeight: "bold" },
      "&:last-of-type": { letterSpacing: 0.47 },
    },
  },
  infoIconContainer: {
    marginRight: 7,
    alignSelf: "center",
    color: theme.palette.text.lightGray,
    fontSize: 20,
  },
  styledTableDataHighlighted: {
    "& p": {
      fontSize: 16,
      fontWeight: "bold",
      letterSpacing: 0.53,
    },
  },
});
