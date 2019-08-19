import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  selectEmpty: {
    "&:before": { display: "none" },
    "& select": {
      "&:hover": {
        backgroundColor: theme.palette.text.transBlueBorderBgHover,
      },
    },
  },
}));
