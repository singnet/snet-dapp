export const useStyles = (theme) => ({
  tabsHeader: {
    backgroundColor: "transparent !important",
    color: theme.palette.text.lightShadedGray,
    display: "flex",
    gap: 20,
    boxShadow: "none !important",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.text.verticalTabLeftBorder,
    "@media(max-width:768px)": { padding: "0 30px" },
    "& button": {
      minWidth: "auto",
      padding: "5px 10px",
      borderRadius: "5px 5px 0 0",
      marginRight: 40,
      fontSize: 18,
      textTransform: "none",
      color: theme.palette.text.lightShadedGray,
      fontFamily: theme.typography.primary.main,
      "&:hover": { color: theme.palette.text.primary },
    },
    "& .Mui-selected": {
      color: theme.palette.text.primary,
      fontWeight: 600,
    },
    "& .MuiTabs-indicator": { backgroundColor: theme.palette.text.primary },
  },
  activeComponentHolder: {
    padding: "30px 0",
  },
});
