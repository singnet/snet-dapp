import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  scrollableContent: {
    width: "100%",
    height: "calc(100vh - 70px)",
    position: "absolute",
    top: 70,
    overflowY: "scroll",
    backgroundColor: theme.palette.text.offWhiteColor,
  },
}));
