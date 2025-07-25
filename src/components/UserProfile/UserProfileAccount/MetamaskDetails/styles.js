export const useStyles = (theme) => ({
  accountDetails: {
    boxSizing: "border-box",
    "& div": {
      display: "flex",
      margin: "7px 0 13px",
      "@media(max-width:600px)": {
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      },
      "& div": {
        width: "45%",
        marginTop: 0,
        display: "inline-block",
        "& svg": {
          color: theme.palette.text.lightShadedGray,
          fontSize: 20,
          marginRight: 11,
          verticalAlign: "middle",
        },
        "& span": {
          boxSizing: "border-box",
          width: "auto",
          display: "inline-block",
          color: theme.palette.text.mediumShadeGray,
          fontSize: 16,
          lineHeight: "22px",
        },
      },
      "& span": {
        width: "55%",
        display: "inline-block",
        color: theme.palette.text.darkShadedGray,
        fontSize: 16,
        "@media(max-width:600px)": { width: "100%" },
      },
    },
    "& > div": {
      "@media(max-width:600px)": {
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: theme.palette.text.disabledBtnBg,
      },
    },
  },
  walletId: {
    wordBreak: "break-all",
  },
  bgBox: {
    alignItems: "center",
    "& > div": { marginTop: "7px !important" },
    "& > span": {
      padding: "14px 20px",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.text.verticalTabLeftBorder,
      borderRadius: 4,
      backgroundColor: theme.palette.text.cardBackground,
    },
  },
  tabsHeader: {
    backgroundColor: "transparent",
    color: theme.palette.text.lightShadedGray,
    boxShadow: "none",
    "& button": {
      minWidth: "auto",
      padding: 0,
      marginRight: 40,
      fontSize: 18,
      textTransform: "none",
      color: theme.palette.text.lightShadedGray,
      fontFamily: theme.typography.primary.main,
    },
    "& .Mui-selected": {
      color: theme.palette.text.primary,
      fontWeight: 600,
    },
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.text.primary,
    },
  },
  tabsContainer: {
    "& > div": {
      width: "100%",
    },
  },
  btnContainer: { textAlign: "center" },
  circularProgress: {
    width: "1rem !important",
    height: "1rem !important",
    color: theme.palette.text.gray1,
  },
});
