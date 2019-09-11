import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  paginationContainer: {
    paddingTop: 14,
    "@media(max-width: 480px)": {
      flexDirection: "column-reverse",
      alignItems: "center",
    },
  },
  pageListformControl: {
    width: 72,
    margin: "0 12px 0 15px",
    "& div": {
      "& div": { padding: "8px 13px" },
    },
    "& fieldset": {
      paddingLeft: "0 !important",
      top: 0,
      "& + div": {
        "& div": {
          padding: "8.5px 13px",
          color: theme.palette.text.darkShadedGray,
        },
      },
      "& legend": { display: "none" },
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
    "@media(max-width: 768px)": { marginBottom: 15 },
  },
  styledPagination: {
    "& button": { color: theme.palette.text.grayTitleText },
    "& .MuiFlatPagination-rootCurrent": {
      padding: "0 8px",
      backgroundColor: theme.palette.text.primary,
      color: "#fff !important",
    },
    "& .MuiFlatPageButton-rootEnd": {
      color: theme.palette.text.grayTitleText,
      fontWeight: 600,
    },
    "& .MuiFlatPageButton-rootEnd.Mui-disabled": {
      color: "rgba(155,155,155,0.5) !important",
    },
  },
}));
