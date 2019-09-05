import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  errorMsg: { margin: 0 },
  error: { color: theme.palette.text.errorRed },
  success: { color: theme.palette.text.successBoxBorder },
  warning: { color: theme.palette.text.warningBorder },
  info: { color: theme.palette.text.primary },
}));
