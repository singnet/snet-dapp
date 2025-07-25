export const useStyles = (theme) => ({
  settingMainContainer: {
    margin: "13px 0 50px",
  },
  settingsContainer: {
    maxWidth: 845,
    flexBasis: "100%",
    borderRadius: 4,
    backgroundColor: theme.palette.text.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    "& h3": {
      padding: "11px 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.gray1,
      margin: 0,
      color: theme.palette.text.darkShadedGray,
      fontSize: 20,
      fontWeight: 400,
    },
    "& h4": {
      margin: "0 0 12px 0",
      color: theme.palette.text.grayTitleText,
      fontSize: 16,
      fontWeight: 600,
      lineHeight: "22px",
    },
  },
  settingsContent: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    padding: "30px 25px",
    "& div": {
      fontFamily: theme.typography.primary.main,
    },
    "& label": {
      color: theme.palette.text.black1,
      fontFamily: theme.typography.primary.main,
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 0.4,
      lineHeight: "16px",
    },
    "& input": {
      color: theme.palette.text.black1,
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: 0.15,
      lineHeight: "24px",
      "@media(max-width:660px)": {
        boxSizing: "border-box",
        padding: "28px 15px",
      },
    },
    "& p": {
      margin: 0,
      color: theme.palette.text.lightShadedGray,
      fontSize: 14,
      letterSpacing: 0.25,
      lineHeight: "20px",
    },
    "& a": { textDecoration: "none" },
  },
  autoRefillCredits: {
    "& > span": {
      fontSize: 16,
      color: theme.palette.text.lightShadedGray,
      verticalAlign: "middle",
      marginRight: 13,
    },
    "& p": {
      fontStyle: "italic",
      marginLeft: 10,
    },
    "& label": {
      "& span": {
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: "20px",
        fontWeight: 600,
      },
    },
  },
  selectBox: {
    margin: "30px 0 10px !important",
  },
  notification: {
    "& label": {
      "& span": {
        fontFamily: theme.typography.primary.main,
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: "20px",
      },
      "& .MuiCheckbox-root": { padding: "0 10px 0 12px" },
    },
  },
  btnContainer: {
    width: "100% !important",
    display: "flex",
    justifyContent: "space-between",
  },
});
