export const useStyles = theme => ({
  errorText: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.backgroundColor.red,
    padding: "13px 20px",
    marginTop: "20px !important",
    backgroundColor: theme.backgroundColor.red,
    color: theme.palette.text.gray2,
    fontSize: "14px !important",
    fontFamily: theme.typography.secondary.main,
    textAlign: "left",
  },
});
