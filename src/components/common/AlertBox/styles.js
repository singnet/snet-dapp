export const useStyles = theme => ({
  messageBox: {
    borderWidth: 1,
    borderStyle: "solid",
    padding: "13px 20px",
    marginTop: "20px ",
    backgroundColor: theme.backgroundColor.red,
    color: theme.palette.text.black1,
    fontSize: "14px ",
    fontFamily: theme.typography.secondary.main,
    textAlign: "left",
  },
  error: {
    borderColor: theme.backgroundColor.red,
    backgroundColor: theme.backgroundColor.red,
  },
  success: {
    borderColor: theme.palette.text.successBoxBorder,
    backgroundColor: theme.backgroundColor.succesBoxBg,
  },
});
