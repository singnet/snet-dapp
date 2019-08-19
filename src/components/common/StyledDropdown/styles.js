import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  selectEmpty: {
    fontFamily: theme.typography.primary.main,
    "&:before": { display: "none" },
    "& select": {
      "&:hover": {
        backgroundColor: theme.palette.text.transBlueBorderBgHover,
      },
    },
  },
}));
