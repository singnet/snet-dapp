export const useStyles = theme => ({
  UserProfileContainer: {
    padding: "70px 85px 0",
    backgroundColor: theme.palette.text.offWhiteColor,
  },
  tabsHeader: {
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
