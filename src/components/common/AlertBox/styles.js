export const useStyles = theme => ({
  messageBox: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 4,
    padding: "13px 20px",
    marginTop: "20px ",
    color: theme.palette.text.alertBoxColor,
    fontSize: "14px !important",
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
    "& a": {
      color: theme.palette.text.infoBoxLink,
      fontWeight: 600,
    },
  },
  info: {
    borderColor: theme.palette.text.primary,
    backgroundColor: theme.palette.text.infoBoxBg,
    "& a": {
      color: theme.palette.text.infoBoxLink,
      fontWeight: 600,
    },
  },
});
