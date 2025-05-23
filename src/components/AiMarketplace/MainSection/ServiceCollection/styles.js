import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  listViewCardCollection: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
    "@media(max-width: 1023px) and (min-width: 768px)": { textAlign: "center" },
    "& a": {
      width: "100%",
      textDecoration: "none ",
      display: "inline-block",
      verticalAlign: "top",
    },
  },
  circularProgressContainer: {
    paddingTop: 20,
    textAlign: "center",
    height: 500,
    display: "table",
    width: "100%",
    "& div": {
      color: theme.palette.text.primary,
    },
  },
  loaderChild: {
    display: "table-cell",
    verticalAlign: "middle",
    margin: "0 auto",
  },
  circularProgress: {
    display: "inline-block",
    width: 48,
    height: 48,
  },
  loaderText: {
    color: theme.palette.text.lightShadedGray,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.25,
  },
  NoResultContainer: {
    height: "calc(100vh - 699px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "& span": {
      color: theme.palette.text.lightShadedGray,
      fontSize: 16,
      lineHeight: "20px",
    },
  },
  gridViewCardCollection: {
    display: "flex",
    gap: 24,
    flexWrap: "wrap",
    "& a": {
      textDecoration: "none ",
      display: "inline-block",
      verticalAlign: "top",
      "&:nth-child(4n) > div": {
        "@media(min-width: 1281px)": { marginRight: 0 },
      },
      "@media(max-width: 1024px)": { textAlign: "center" },
      "& > div": {
        "@media(max-width: 768px)": { marginRight: 0 },
      },
      "@media(max-width: 768px)": { textAlign: "center" },
    },
    "@media(max-width: 1420px)": { justifyContent: "center" },
    // "@media(min-width: 768px) and (max-width: 1024px)": { justifyContent: "center" },
    "@media(max-width: 768px)": { flexDirection: "column" },
  },
}));
