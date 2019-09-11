export const useStyles = theme => ({
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
    },
    "& h4": {
      margin: "0 0 20px 0",
      color: theme.palette.text.grayTitleText,
      fontSize: 16,
      fontWeight: 600,
      lineHeight: "22px",
    },
  },
  settingsContent: {
    padding: "30px 25px",
    "& div": {
      width: 411,
      margin: "30px 0 0",
      "@media(max-width:660px)": {
        width: "100%",
        flexDirection: "column",
      },
      "&:first-of-type": {
        marginTop: 0,
      },
    },
    "& label": {
      color: theme.palette.text.black1,
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
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: "20px",
        fontWeight: 600,
      },
    },
  },
  btnContainer: {
    width: "100% !important",
    display: "flex",
    justifyContent: "space-between",
  },
});
