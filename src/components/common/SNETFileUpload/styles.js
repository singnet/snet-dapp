import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((MUITheme) => ({
  fileUploaderContainer: {
    display: "flex",
    gap: 20,
  },
  fileUploaderText: {
    boxSizing: "border-box",
    position: "relative",
    width: "100%",
    padding: "50px 45px !important",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: MUITheme.palette.text.darkGray,
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    textAlign: "center",
    "& svg": {
      color: MUITheme.palette.primary.main,
      fontSize: 40,
    },
    "& p": {
      whiteSpace: "wrap",
      textOverflow: "ellipsis",
      width: "100%",
      overflow: "hidden",
      "&:first-of-type": {
        color: MUITheme.palette.text.lightGrey,
        fontSize: 14,
        "& span": { color: MUITheme.palette.primary.main },
      },
      "&": {
        color: "#4a4a4a",
        fontSize: 12,
      },
    },
  },
  cleanButton: {
    position: "absolute",
    right: 0,
    top: 0,
    "& svg": {
      width: 25,
      height: 25,
      fill: MUITheme.palette.text.mediumShadeGray,
    },
  },
  title: {
    color: MUITheme.palette.text.lightGrey,
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.25,
    lineHeight: "20px",
  },
  value: {
    color: MUITheme.palette.text.lightGrey,
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: "20px",
  },
  uploadStatusContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: 18,
    lineHeight: "23px",
    "& svg": {
      color: "#6D7278",
      fontSize: 41,
    },
    "& p": {
      marginLeft: 10,
      color: "rgba(0,0,0,0.25)",
      fontSize: 18,
      lineHeight: "23px",
      whiteSpace: "nowrap",
    },
  },
  successfullUpload: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      color: MUITheme.palette.success.main,
      fontSize: 41,
    },
    "& p": {
      marginLeft: 10,
      color: MUITheme.palette.success.main,
    },
  },
  imgUploaderContainer: {
    display: "flex",
    "& > div": {
      "&:first-of-type": {
        // width: 377,
        [MUITheme.breakpoints.down("sm")]: { width: "100%" },
      },
    },
    [MUITheme.breakpoints.down("sm")]: { flexDirection: "column" },
  },
  uploadDetails: {
    "& > div": { marginBottom: 8 },
    [MUITheme.breakpoints.down("sm")]: { paddingTop: 25 },
  },
  uploadBtns: {
    marginTop: 20,
    "& a": {
      textDecoration: "none",
    },
    "& button": {
      padding: 0,
      "&:last-of-type": { marginLeft: 40 },
    },
  },
  errorField: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      color: MUITheme.palette.error.main,
      fontSize: 41,
    },
    "& p": {
      marginLeft: 10,
      color: MUITheme.palette.error.main,
    },
  },
  statRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
}));
