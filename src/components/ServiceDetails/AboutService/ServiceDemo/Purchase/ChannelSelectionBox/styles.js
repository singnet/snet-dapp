export const useStyles = theme => ({
  ChannelSelectionBoxContainer: {
    cursor: "pointer",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.text.verticalTabLeftBorder,
    borderRadius: 4,
    marginBottom: 20,
    backgroundColor: theme.palette.text.cardBackground,
    "&:hover": {
      borderColor: theme.palette.text.primary,
      backgroundColor: "rgba(64,134,255,0.03)",
    },
    "@media(max-width:480px)": { flexDirection: "column" },
  },
  disabledChannelBox: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#eee",
    backgroundColor: "#fefefe",
  },
  selectedChannelBox: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.text.primary,
    backgroundColor: theme.palette.text.cardBackground,
  },
  LeftSideSection: {
    padding: "14px 8px 14px 28px",
    display: "flex",
    alignItems: "center",
    "@media(max-width:1023px)": { padding: "14px 0" },
    "@media(max-width:480px)": { maxWidth: "100%" },
  },
  RadioButtonContainer: {
    "&.Mui-checked": { color: theme.palette.text.primary },
  },
  InputDataContainer: {
    "& h2": {
      marginBottom: 8,
      color: theme.palette.text.darkShadedGray,
      fontSize: 22,
      lineHeight: "30px",
      "@media(max-width:1023px)": {
        fontSize: 16,
        lineHeight: "20px",
      },
    },
    "& input": {
      width: 24,
      padding: "7px",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.text.inputBoxBorder,
      borderRadius: 4,
      marginRight: 30,
      backgroundColor: theme.palette.text.whiteColor,
      color: theme.palette.text.mediumShadeGray,
      fontSize: 16,
      textAlign: "center",
      "&:disabled": { backgroundColor: theme.palette.text.cardBackground, borderColor: "#eee" },
      "@media(max-width:1023px)": { marginRight: 10 },
    },
    "& span": {
      color: theme.palette.text.lightShadedGray,
      lineHeight: "17px",
    },
  },
  disabledInputDataContainer: {
    "& h2": {
      color: theme.palette.text.disabledBtnBg,
    },
    "& input": {
      color: theme.palette.text.disabledBtnBg,
    },
    "& span": {
      color: theme.palette.text.disabledBtnBg,
    },
  },
  value: {
    fontSize: 18,
    "@media(max-width:1023px)": { fontSize: 16 },
  },
  unit: {
    marginLeft: 5,
    display: "inline-block",
    fontSize: 12,
  },
  selectionBoxDescription: {
    padding: "14px 8px",
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: theme.palette.text.verticalTabLeftBorder,
    display: "flex",
    alignItems: "center",
    "& p": {
      paddingLeft: 22,
      margin: 0,
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      lineHeight: "21px",
    },
    "@media(max-width:480px)": {
      maxWidth: "100%",
      borderLeft: 0,
    },
  },
  disabledSelectionBoxDescription: {
    "& p": {
      color: theme.palette.text.disabledBtnBg,
    },
  },
});
