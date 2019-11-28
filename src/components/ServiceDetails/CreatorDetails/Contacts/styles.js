export const useStyles = theme => ({
  card: {
    width: 500,
    paddingTop: 10,
    margin: "20% auto",
    fontSize: 22,
  },
  closeIcon: {
    cursor: "pointer",
    float: "right",
  },
  header: {
    backgroundColor: theme.palette.text.offWhiteColor,
  },
  listItemText: {
    display: "grid",
    gridTemplateColumns: "30% auto",
  },
  anchor: {
    color: theme.palette.text.primary,
    cursor: "pointer",
    textDecoration: "none",
  },
});
