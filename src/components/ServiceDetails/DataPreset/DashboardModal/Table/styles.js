export const useStyles = (theme) => ({
  tableHead: {
    color: theme.palette.text.mediumShadeGray,
  },
  tableBody: {
    color: "#222",
  },
  tableCeil: {
    padding: 10,
    margin: "5px 0",
    textAlign: "left",
    borderBottom: `1px solid ${theme.palette.text.verticalTabLeftBorder}`,
    fontSize: 16,
    fontWeight: 500,
  },
});
