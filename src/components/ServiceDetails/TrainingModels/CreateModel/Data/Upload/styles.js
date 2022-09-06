export const useStyles = theme => ({
  appBar: {
    marginTop: 24,
    backgroundColor: theme.palette.text.white,
    boxShadow: "none",
  },
  tabsContainer: {
    '& .MuiTab-textColorPrimary.Mui-selected': { color: theme.palette.text.primary },
    '& .MuiTabs-indicator': { backgroundColor: theme.palette.text.primary }
  },
  tab: { 
    padding: 0,
    letterSpacing: 0.54,
    textTransform: 'capitalize'
}
});
