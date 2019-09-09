export const useStyles = theme => ({
  Userdetails: {
    display: "flex",
    marginBottom: 10,
    "& span": {
      color: theme.palette.text.lightShadedGray,
      fontSize: 66,
    },
    "& div": {
      marginLeft: 22,
      "& h4": {
        fontWeight: 600,
        margin: 0,
        color: theme.palette.text.black1,
        lineHeight: "27px",
        fontSize: 20,
      },
      "& a": {
        color: theme.palette.text.lightShadedGray,
        fontSize: 16,
        lineHeight: "22px",
        textDecoration: "none",
        "&:hover": {
          color: theme.palette.text.primary,
          fontweight: 600,
        },
      },
    },
  },
  closeIcon: {
    position: "absolute",
    cursor: "pointer",
    top: 10,
    right: 20,
    display: "none",
    "@media(max-width: 768px)": { display: "block" },
  },
});
