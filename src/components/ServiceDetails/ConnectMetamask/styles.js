export const useStyles = (theme) => ({
  connectMMContainer: {
    width: "100%",
    padding: "80px 0",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    "& > span": {
      marginTop: 24,
      color: theme.palette.text.primary,
      fontSize: 18,
      lineHeight: "23px",
    },
    "& p": {
      margin: "9px 0",
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      fontWeight: 300,
      lineHeight: "24px",
    },
  },
});
