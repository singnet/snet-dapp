import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  paginationContainer: {
    paddingTop: 10,
  },
  pageListformControl: {
    width: 72,
    margin: "0 12px 0 15px",
    "& fieldset": {
      paddingLeft: "0 !important",
      top: 0,
      "& + div": {
        "& div": {
          padding: "8.5px 13px",
          color: theme.palette.text.darkShadedGray,
        },
      },
      "& legend": {
        display: "none",
      },
    },
  },
  pageCountSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& span": {
      color: theme.palette.text.lightShadedGray,
      fontSize: 14,
    },
  },
}));
