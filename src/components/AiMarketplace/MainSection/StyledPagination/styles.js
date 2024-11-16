import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  paginationContainer: {
    paddingTop: 14,
    "@media(max-width: 668px)": {
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
}));
