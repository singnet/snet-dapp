export const useStyles = theme => ({
  installAndRunContainer: {
    marginBottom: 25,
    "& h3": {
      padding: "11px 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.gray1,
      margin: 0,
      color: theme.palette.text.darkShadedGray,
      fontSize: 20,
    },
    "& .ProjectDetails-projectDetailsContainer-415": {
      "& h3": {
        marginBottom: 20,
      },
    },
  },
  integrationSetupContainer: {
    margin: "30px 25px 0 0",
    borderRadius: 4,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    backgroundColor: theme.palette.text.white,
  },
  integrationContent: {
    height: 500,
    padding: "0 22px",
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
