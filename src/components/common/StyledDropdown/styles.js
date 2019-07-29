import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  selectEmpty: {
    "&:before": { display: "none" },
    "& select": {
      width: "100%",
      padding: "auto",
      "&:hover": {
        backgroundColor: theme.palette.text.transBlueBorderBgHover,
      },
    },
  },
}));
