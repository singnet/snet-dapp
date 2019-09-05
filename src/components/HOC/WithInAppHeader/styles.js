import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  scrollableContent: {
  	height: 'calc(100vh - 70px)',
    position: "absolute",
    top: 70,
    overflowY: 'scroll'
  },
}));
