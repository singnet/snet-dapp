import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  selectEmpty: {
    fontFamily: theme.typography.primary.main,
    color: `${theme.palette.text.dialogTitle} !important`,
    "& .MuiSelect-root": {
      letterSpacing: 0.15,
      lineHeight: "24px",
    },
    "&:before": { display: "none" },
    "& select": {
      "&:hover": {
        backgroundColor: theme.palette.text.transBlueBorderBgHover,
      },
    },
    "& .MuiSelect-select": {
      "&:focus": { backgroundColor: "transparent" },
    },
  },
}));
