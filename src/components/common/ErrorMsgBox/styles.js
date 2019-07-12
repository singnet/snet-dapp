export const useStyles = theme => ({
  errorText: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.backgroundColor.red,
    borderRadius: 2,
    padding: "13px 20px",
    backgroundColor: theme.backgroundColor.red,
    color: theme.palette.text.black1,
    fontSize: "14px !important",
    fontFamily: theme.typography.secondary.main,
    textAlign: "left",
  },
});
