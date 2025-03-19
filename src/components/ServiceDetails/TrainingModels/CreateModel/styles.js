export const useStyles = (theme) => ({
  createModelContainer: {
    "& > div": {
      "&:first-of-type": {
        "& ul": {
          justifyContent: "center",
          "@media(max-width: 570px)": {
            width: "30%",
            margin: "0 auto",
            flexDirection: "column",
            alignItems: "flex-start",
            "& li": {
              "@media(max-width: 570px)": { marginBottom: 10 },
              "&::before": {
                "@media(max-width: 570px)": { display: "none" },
              },
            },
          },
        },
        "& li::before": {
          width: 50,
          margin: "0 10px",
        },
        "@media(max-width: 1015px)": { width: "100%" },
      },
    },
  },
  editModelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& h2": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 16,
      lineHeight: "25px",
      "& span": { fontSize: 18 },
    },
  },
});
