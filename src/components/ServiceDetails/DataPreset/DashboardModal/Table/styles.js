export const useStyles = (theme) => ({
  tableHead: {
    color: theme.palette.text.mediumShadeGray,
    fontWeight: 600,
  },
  tableBody: {
    color: "#222",
    fontWeight: 500,
  },
  tableCeil: {
    padding: 10,
    margin: "5px 0",
    textAlign: "left",
    borderBottom: `1px solid ${theme.palette.text.verticalTabLeftBorder}`,
    fontSize: 16,
  },
});
