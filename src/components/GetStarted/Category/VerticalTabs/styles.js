export const useStyles = theme => ({
  VerticalTabsContainer: {
    display: "flex",
    "& button": {
      maxWidth: "100%",
      padding: "0 0 0 25px",
      borderLeftWidth: 1,
      borderLeftStyle: "solid",
      borderLeftColor: theme.palette.text.verticalTabLeftBorder,
      color: theme.palette.text.lightShadedGray,
      fontFamily: theme.typography.primary.main,
      fontSize: 16,
      lineHeight: "22px",
      textTransform: "initial",
      "&.Mui-selected": {
        color: theme.palette.text.primary,
        borderLeft: 2,
        borderLeftStyle: "solid",
        borderLeftColor: theme.palette.text.primary,
        backgroundColor: theme.palette.text.white,
        fontWeight: 600,
      },
      "&:hover": {
        backgroundColor: theme.palette.text.white,
        color: theme.palette.text.primary,
        fontWeight: 600,
      },
      "& span": {
        "&:first-of-type": { alignItems: "flex-start" },
      },
    },
  },
  TabsWrapper: {
    width: "100%",
    "& .MuiTabs-flexContainer": { flexDirection: "column" },
    "& .MuiTabs-indicator": { display: "none" },
  },
});
