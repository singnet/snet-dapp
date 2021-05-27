export const useStyles = theme => ({
  updateNotificationBar: {
    padding: "2px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#800080",
    color: theme.palette.text.white,
    "& img": { marginRight: 12 },
    "& p": {
      margin: 0,
      fontSize: 14,
      letterSpacing: "0.25px",
      lineHeight: "18px",
      textAlign: "center",
      "& span": { fontWeight: "bold" },
      "& a": {
        color: "#fff",
        fontWeight: 200,
        textDecoration: "none",
        "@media(max-width:764px)": { display: "block" },
      },
      "& svg": { fontSize: 12 },
      "@media(max-width:764px)": { padding: "10px 0" },
    },
  },
  closeIcon: {
    position: "absolute",
    right: 95,
    cursor: "pointer",
    "@media(max-width:1024px)": { right: 10 },
  },
});
