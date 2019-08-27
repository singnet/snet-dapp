import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  number: {
    borderRadius: 25,
    padding: "4px 10px",
    marginRight: 10,
    backgroundColor: theme.palette.text.lightShadedGray,
    color: theme.palette.text.white,
  },
  TabTitle: {
    color: theme.palette.text.lightShadedGray,
    fontSize: 14,
  },
  completedIcon: {
    "& span": {
      color: theme.palette.text.successBoxBorder,
      fontSize: 28,
      marginRight: 10,
    },
  },
  active: {
    "& span": {
      "&:first-of-type": { backgroundColor: theme.palette.text.primary },
      "&:last-of-type": { color: theme.palette.text.darkShadedGray },
    },
  },
  completed: {
    "&:last-of-type span": { color: theme.palette.text.darkShadedGray },
  },
}));
