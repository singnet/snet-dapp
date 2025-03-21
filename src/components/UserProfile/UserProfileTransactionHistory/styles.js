export const useStyles = (theme) => ({
  transactionHistoryMainContainer: {
    margin: "13px 0 30px",
    backgroundColor: theme.palette.text.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    "& h3": {
      padding: "12px 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.gray1,
      margin: 0,
      color: theme.palette.text.darkShadedGray,
      fontSize: 20,
      fontWeight: 400,
      "@media(max-width:1280px)": {
        boxSizing: "border-box",
      },
    },
  },
  transactionHistoryContainer: { "@media(max-width: 1280px)": { overflow: "auto" } },
  transactionHistoryContent: {
    // "@media(max-width:1280px)": { width: 1280 },
    "& h3": {
      textAlign: "center",
    },
  },
  tabsHeader: {
    padding: "7px 22px 0",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "#e2e2e2",
    backgroundColor: "transparent",
    color: theme.palette.text.lightShadedGray,
    boxShadow: "none",
    "& button": {
      minWidth: "auto",
      padding: 0,
      marginRight: 40,
      fontSize: 20,
      textTransform: "none",
      color: theme.palette.text.lightShadedGray,
      fontFamily: theme.typography.primary.main,
    },
    "& .Mui-selected": {
      color: theme.palette.text.primary,
      fontWeight: 600,
    },
    "& .MuiTabs-indicator": { backgroundColor: theme.palette.text.primary },
  },
});
