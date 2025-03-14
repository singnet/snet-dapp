export const useStyles = () => ({
  mainSection: {
    maxWidth: 1280,
    margin: "0 auto",
    "& div": {
      "@media(max-width: 1024px)": { maxWidth: "100%" },
    },
    "@media(max-width: 1280px)": { paddingBottom: 30 },
  },
  servieMainContainer: {
    padding: "40px 0",
  },
});
