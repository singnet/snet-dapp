export const useStyles = (theme) => ({
  ChannelSelectionBoxContainer: {
    cursor: "pointer",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.text.verticalTabLeftBorder,
    borderRadius: 4,
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
    boxShadow: `0 0 5px ${theme.palette.text.primary}`,
  },
  LeftSideSection: {
    padding: "14px 10px",
    display: "flex",
    alignItems: "center",
    "@media(max-width:480px)": { maxWidth: "100%" },
  },
  RadioButtonContainer: {
    "&.Mui-checked": { color: theme.palette.text.primary },
  },
  InputDataContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
    maxWidth: "70%",
    "& h2": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 22,
      lineHeight: "30px",
      padding: 0,
      margin: 0,
      "@media(max-width:1023px)": {
        fontSize: 16,
        lineHeight: "20px",
      },
    },
    "& input": {
      padding: "7px",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.text.inputBoxBorder,
      borderRadius: 4,
      backgroundColor: theme.palette.text.whiteColor,
      color: theme.palette.text.mediumShadeGray,
      fontSize: 16,
      textAlign: "center",
      "&:disabled": { backgroundColor: theme.palette.text.cardBackground, borderColor: "#eee" },
    },
    "& span": {
      color: theme.palette.text.lightShadedGray,
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
  priceContainer: {
    fontSize: 16,
    display: "flex",
    gap: 5,
    flexWrap: "wrap",
  },
  value: {
    overflow: "auto",
  },
  selectionBoxDescription: {
    padding: "14px 8px",
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: theme.palette.text.verticalTabLeftBorder,
    display: "flex",
    alignItems: "center",
    "& p": {
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
