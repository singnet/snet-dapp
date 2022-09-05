export const useStyles = theme => ({
  modelInfoContaienr: {
    padding: "61px 24px 24px",
  },
  switchToggle: {
    margin: 0,
    "& .MuiSwitch-root": {
      width: 45,
      height: 20,
      padding: 0,
      borderRadius: 15,
      marginRight: 8,
      display: "initial",
      backgroundColor: "#8C939B",
    },
    "& .MuiSwitch-switchBase": { padding: 0 },
    "& .MuiSwitch-colorSecondary.Mui-checked": { color: theme.palette.text.white },
    "& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track": {
      backgroundColor: theme.palette.text.primary,
      opacity: 1,
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
    "& .MuiFormControlLabel-label": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 14,
      lineHeight: "18px",
    },
  },
  trainingBasicDetails: {
    marginTop: 27,
    "& > div": {
      display: "flex",
      flexDirection: "column",
      "& span": {
        margin: "8px 0 24px",
        color: theme.palette.text.mediumShadeGray,
        fontSize: 14,
        fontWeight: 300,
        lineHeight: "24px",
      },
    },
  },
  methodDropBox: {
    "& .MuiFormControl-root": { 
      width: 512,
      '@media(max-width: 570px)': { width: '100%' }
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
      width: 512,
      margin: 0,
      "& .MuiFormLabel-root": { color: theme.palette.text.darkShadedGray },
      "& fieldset": { borderColor: "#c4c4c4" },
      "& input": { color: theme.palette.text.darkShadedGray },
      '@media(max-width: 570px)': { width: '100%' },
    },
  },
  modelDescriptionContainer: {
    "& > div": { 
      width: 512,
      '@media(max-width: 570px)': { width: '100%' }
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
  ethAddresses: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    "& > span": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 14,
      lineHeight: "18px",
    },
  },
  ethAddTextBox: {
    display: "flex",
    alignItems: "center",
    "& > div": {
      width: 512,
      margin: "12px 0 16px",
      "& input": {
        padding: "15.7px 14px",
        color: theme.palette.text.mediumShadeGray,
        fontSize: 14,
        '&::placeholder': {
          color: theme.palette.text.mediumShadeGray,
          opacity: 1
        }
      },
      '@media(max-width: 570px)': { width: '100%' }
    },
    "& svg": {
      marginLeft: 24,
      color: theme.palette.text.redBtnText,
      fontSize: 20,
    },
  },
  addTextBox: {
    marginTop: 24,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.primary,
    cursor: 'pointer',
    '& svg': { fontSize: 20 },
    '& span': { fontSize: 14 }    
  },
  btnContainer: { 
    marginTop: 24,
    textAlign: 'center' 
  }
});
