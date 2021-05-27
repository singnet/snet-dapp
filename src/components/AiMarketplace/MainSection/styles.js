export const useStyles = theme => ({
  mainSection: {
    padding: "40px 0 60px",
    "& div": {
      "@media(max-width: 1024px)": { maxWidth: "100%" },
    },
    "@media(max-width: 1280px)": { paddingBottom: 30 },
    // "@media(max-width: 1024px)": { flexDirection: "column" },
  },
});
