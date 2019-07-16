import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  formControl: {
    "& label": {
      fontFamily: theme.typography.primary.main,
      "& div": {
        "&::before": {
          borderBottom: "none",
        },
      },
    },
    "& svg": {
      right: "-15px",
      color: theme.palette.text.primary,
    },
    "& label + div": {
      "&::before": {
        borderBottom: "none",
      },
    },
  },
}));
