export const useStyles = theme => ({
  mainSection: {
    padding: "40px 0 60px",
    "& div": {
      "@media(max-width: 1024px)": { maxWidth: "100%" },
    },
    "@media(max-width: 1280px)": { paddingBottom: 30 },
    "@media(max-width: 1024px)": { flexDirection: "column" },
  },
  filterMainContainer: {
    "@media(min-width: 1281px)": {
      maxWidth: "23%",
      paddingLeft: 20,
    },
    "@media(min-width: 1024px) and (max-width: 1280px)": {
      maxWidth: "30%",
      flexBasis: "30%",
    },
  },
  servieMainContainer: {
    "@media(min-width: 1024px) and (max-width: 1280px)": {
      maxWidth: "70%",
      flexBasis: "70%",
    },
  },
});
