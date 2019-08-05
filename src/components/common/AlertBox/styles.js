export const useStyles = theme => ({
  messageBox: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 2,
    padding: "13px 20px",
    marginTop: "20px ",
    color: theme.palette.text.alertBoxColor,
    fontSize: "14px ",
    fontFamily: theme.typography.secondary.main,
    lineHeight: "20px",
    letterSpacing: 0.25,
    textAlign: "left",
  },
  error: {
    borderColor: theme.palette.text.alertBoxBorder,
    backgroundColor: theme.palette.text.alertBoxBackgroundColor,
  },
  success: {
    borderColor: theme.palette.text.successBoxBorder,
    backgroundColor: theme.backgroundColor.succesBoxBg,
  },
  warning: {
    borderColor: theme.palette.text.warningBoxBorder,
    backgroundColor: theme.palette.text.warningBoxBg,
  },
});
