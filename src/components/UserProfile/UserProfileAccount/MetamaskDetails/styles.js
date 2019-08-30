export const useStyles = theme => ({
  accountDetails: {
    marginTop: 32,
    "& div": {
      display: "flex",
      margin: "7px 0 13px",
      "& div": {
        width: "56%",
        marginTop: 0,
        display: "inline-block",
        "& svg": {
          color: theme.palette.text.lightShadedGray,
          fontSize: 20,
          marginRight: 11,
          verticalAlign: "middle",
        },
        "& span": {
          width: "auto",
          display: "inline-block",
          color: theme.palette.text.mediumShadeGray,
          fontSize: 16,
          lineHeight: "22px",
        },
      },
      "& span": {
        width: "44%",
        display: "inline-block",
        color: theme.palette.text.darkShadedGray,
        fontSize: 16,
      },
    },
  },
  walletId: {
    fontSize: "14px !important",
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
      marginBottom: 28,
    },
  },
  btnContainer: { textAlign: "center" },
});
