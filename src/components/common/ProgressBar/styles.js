export const useStyles = theme => ({
  tabsContainer: {
    width: 630,
    paddingTop: 25,
    margin: "0 auto",
    "& ul": {
      margin: 0,
      padding: 0,
      display: "flex",
      justifyContent: "space-between",
      "@media (max-width:470px)": {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    "& li": {
      display: "flex",
      alignItems: "center",
      listStyle: "none",
      "&:first-of-type": {
        "&::before": {
          display: "none",
        },
      },
      "&::before": {
        content: '""',
        width: 90,
        height: 1,
        marginRight: 16,
        display: "inline-block",
        backgroundColor: theme.palette.text.lightGray,
        verticalAlign: "middle",
        "@media (max-width:724px)": {
          display: "none",
        },
      },
      "& i": {
        marginRight: 5,
        color: theme.palette.text.green,
        fontSize: 20,
      },
      "@media (max-width:470px)": { marginBottom: 20 },
    },
    "@media (max-width:724px)": { width: "90%" },
  },
  active: {
    "& span": {
      "&:first-of-type": { backgroundColor: theme.palette.text.primary },
      "&:last-of-type": { color: theme.palette.text.darkShadedGray },
    },
  },
});
