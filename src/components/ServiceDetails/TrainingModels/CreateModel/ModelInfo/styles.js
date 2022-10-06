export const useStyles = theme => ({
  modelInfoContaienr: { padding: "61px 24px 24px" },
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
    marginTop: 27,
    "& > div": {
      marginBottom: 24,
      display: "flex",
      alignItems: 'center',
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
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#828282'},
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
  accessModelContainer: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    "& > span": {
      marginLeft: 53,
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      fontWeight: 300,
      lineHeight: "24px",
    },
  },
  ethAddressContainer: {
    margin: "30px 0 0 53px",
    display: "flex",
    flexDirection: "column",
    "& > span": {
      marginBottom: 16,
      display: 'inline-block',
      color: theme.palette.text.darkShadedGray,
      fontSize: 14,
      lineHeight: "18px",
    },
  },
  addMoreEthAdd: {
    "& > div:first-of-type": {
      width: 370,
      margin: 0,
      "& input": {
        padding: "19.7px 14px",
        color: theme.palette.text.mediumShadeGray,
        fontSize: 14,
        "&::placeholder": {
          color: theme.palette.text.mediumShadeGray,
          opacity: 1,
        },
      },
      "@media(max-width: 570px)": { width: "100%" },
    },
  },
  addTextBox: {
    marginTop: 16,
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.primary,
    cursor: "pointer",
    "& svg": {
      marginRight: 10,
      fontSize: 20,
      cursor: 'pointer'
    },
    "& span": { fontSize: 14 },
  },
  addedEthAdd: {
    marginBottom: 8,
    "& span": {
      boxSizing: 'border-box',
      width: 370,
      padding: '17px 15px',
      border: "1px solid #828282",
      borderRadius: 4,
      marginRight: 24,
      display: 'inline-block',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    "& svg": { color: "#D6201F" }
  },
  btnContainer: {
    marginTop: 24,
    textAlign: "center",
  },
});

