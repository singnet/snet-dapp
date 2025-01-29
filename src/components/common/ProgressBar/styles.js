export const useStyles = (theme) => ({
  tabsContainer: {
    width: 630,
    margin: "0 auto",
    "& ul": {
      margin: 0,
      padding: 0,
      display: "flex",
      flexWrap: "wrap",
      gap: 15,
      justifyContent: "center",
      "@media (max-width:420px)": {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    "& li": {
      whiteSpace: "nowrap",
      display: "flex",
      alignItems: "center",
      listStyle: "none",
      "&:first-of-type": {
        "&::before": { display: "none" },
      },
      "&::before": {
        content: '""',
        width: 90,
        height: 1,
        marginRight: 16,
        display: "inline-block",
        backgroundColor: theme.palette.text.lightGray,
        verticalAlign: "middle",
        "@media (max-width:1150px)": { width: 50 },
        "@media (max-width:470px)": { width: 10 },
        "@media (max-width:420px)": { display: "none" },
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
});
