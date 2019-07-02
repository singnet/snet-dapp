export const useStyles = theme => ({
  tabsHeader: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.text.lightGray,
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
      fontFamily: "sans-serif",
    },
    "& .Mui-selected": {
      color: theme.palette.text.primary,
    },
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.text.primary,
    },
  },
});
