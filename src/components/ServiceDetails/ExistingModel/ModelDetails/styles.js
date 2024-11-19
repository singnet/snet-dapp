import { modelStatus } from "./index";

export const useStyles = (theme) => ({
  modelDetailsContainer: {
    padding: "21px 21px 16px 22px",
    border: "1px solid #ECECEC",
    borderRadius: 4,
    margin: "17px 23px 24px",
    backgroundColor: theme.palette.text.gray1,
    "& p": {
      margin: 0,
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      fontWeight: 300,
      lineHeight: "18px",
    },
  },
  modelDetails: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingBottom: 16,
  },
  titleIdContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h3": {
      margin: 0,
      color: theme.palette.text.darkShadedGray,
      fontSize: 18,
      lineHeight: "23px",
    },
  },
  descriptionContainer: {
    fontSize: 18,
  },
  statusAccessLastUpdateContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& > div": {
      // width: "60%",
      display: "flex",
      alignItems: "center",
      "& div": {
        color: theme.palette.text.darkShadedGray,
        fontSize: 14,
        fontWeight: "bold",
        "& span": { color: theme.palette.text.mediumShadeGray },
        [`& span[data-status-type="${modelStatus.CREATED}"]`]: { color: "#4086ff" },
        [`& span[data-status-type="${modelStatus.IN_PROGRESS}"]`]: { color: "#2CB7CF" },
        [`& span[data-status-type="${modelStatus.COMPLETED}"]`]: { color: "#0B8E1C" },
        [`& span[data-status-type="${modelStatus.ERRORED}"]`]: { color: theme.palette.text.errorRed },
        [`& span[data-status-type="${modelStatus.DELETED}"]`]: { color: theme.palette.text.errorRed },
      },
    },
    "& > p": {
      color: theme.palette.text.mediumShadeGray,
      fontSize: 12,
      lineHeight: "15px",
    },
    "@media(max-width: 520px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  additionalInfoContainer: {
    display: "flex",
    gap: 30,
  },
  actionButtons: {
    paddingTop: 16,
    borderTop: "1px solid #ececec",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& svg": {
      paddingRight: 4,
      fontSize: 18,
    },
    "& span": {
      fontSize: 14,
      letterSpacing: 1.3,
      lineHeight: "18px",
      textTransform: "capitalize",
    },
  },
  updateBtn: { color: theme.palette.text.darkShadedGray },
  inferenceBtn: {
    background: theme.palette.text.primary,
    color: theme.palette.text.white,
    "&:hover": {
      background: theme.palette.text.customHoverBlue,
    },
    "&:disabled": {
      backgroundColor: theme.palette.text.lightGray,
      color: theme.palette.text.white,
    },
  },
  deleteBtn: { color: theme.palette.text.redBtnText },
  deleteModalContent: {
    width: 580,
    padding: "30px 22px 24px",
    borderRadius: 4,
    position: "absolute",
    top: "50%",
    left: "50%",
    boxShadow: "0 0 2px 0 rgba(0,0,0,0.15), 0 1px 2px 0 rgba(0,0,0,0.15)",
    backgroundColor: theme.palette.text.white,
    transform: "translate(-50%, -50%)",
    "& h2": {
      color: theme.palette.text.darkShadedGray,
      fontFamily: "Muli",
      fontSize: 20,
      fontWeight: 600,
      lineHeight: "25px",
    },
    "& p": {
      margin: "8px 0 24px",
      color: theme.palette.text.mediumShadeGray,
      fontFamily: "Muli",
      fontSize: 14,
      fontWeight: 300,
      lineHeight: "24px",
    },
    "@media(max-width: 600px)": { width: "100%" },
  },
  deleteModalActions: {
    display: "flex",
    justifyContent: "end",
    gap: 15,
    "& button": {
      textTransform: "initial",
      letterSpacing: 1.3,
      fontWeight: 400,
      "&:last-of-type": {
        backgroundColor: theme.palette.text.redBtnText,
        "&:hover": { backgroundColor: theme.palette.text.redBtnBg },
      },
    },
  },
  accessValueContainer: {
    position: "relative",
    "& span": {
      cursor: "pointer",
      "&:hover": {
        "& + ul": { display: "block" },
      },
    },
    "& ul": {
      margin: "7px 0 0",
      borderRadius: 8,
      padding: "10px 15px",
      display: "none",
      position: "absolute",
      transform: "translateX(-10%)",
      zIndex: 1,
      background: "#333333bf",
      color: theme.palette.text.white,
      fontWeight: 400,
      listStyle: "none",
      "& li": {
        paddingBottom: 5,
        "&:last-of-type": { paddingBottom: 0 },
      },
    },
  },
});
