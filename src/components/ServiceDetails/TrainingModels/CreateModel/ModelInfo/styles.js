export const useStyles = (theme) => ({
  modelInfoContaienr: { padding: 30 },
  switchToggle: {
    width: 45,
    height: 20,
    padding: 0,
    borderRadius: 25,
    margin: 0,
    "& > span": { padding: 0 },
    "& + span": {
      paddingLeft: 8,
      color: theme.palette.text.darkShadedGray,
      fontSize: 14,
      lineHeight: "18px",
    },
    "& .MuiSwitch-colorPrimary.Mui-checked": { color: theme.palette.text.white },
    "& .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track": {
      backgroundColor: theme.palette.text.primary,
      opacity: 1,
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  },
  trainingBasicDetails: {
    "& > div": {
      marginBottom: 24,
      display: "flex",
      alignItems: "center",
      "& span": {
        margin: "0 0 0 24px",
        color: theme.palette.text.lightShadedGray,
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: "20px",
      },
    },
  },
  methodDropBox: {
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#828282" },
    "& .MuiFormControl-root": {
      width: 370,
      "@media(max-width: 570px)": { width: "100%" },
    },
    "& .MuiFormLabel-root": {
      padding: "0 15px 0 5px",
      top: 7,
      color: theme.palette.text.darkShadedGray,
      backgroundColor: theme.palette.text.white,
    },
    "& .MuiSelect-root": {
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      lineHeight: "18px",
    },
  },
  modelNameContainer: {
    "& > div": {
      width: 370,
      margin: 0,
      "& .MuiFormLabel-root": { color: theme.palette.text.darkShadedGray },
      "& fieldset": { borderColor: "#c4c4c4" },
      "& input": { color: theme.palette.text.darkShadedGray },
      "@media(max-width: 570px)": { width: "100%" },
    },
  },
  modelDescriptionContainer: {
    "& > div": {
      width: 512,
      "@media(max-width: 570px)": { width: "100%" },
    },
  },
  btnContainer: {
    marginTop: 24,
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
  },
  editVersionBtnContainer: {
    marginTop: 32,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
});
