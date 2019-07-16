import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  selectEmpty: {
    "&:before": { display: "none" },
    "& select": {
      width: "100%",
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
}));
