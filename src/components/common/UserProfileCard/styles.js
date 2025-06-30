export const useStyles = (theme) => ({
  Userdetails: {
    display: "flex",
    "& span": {
      color: theme.palette.text.lightShadedGray,
      fontSize: 66,
    },
    "& div": {
      marginLeft: 22,
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
  reactBlockies: {
    borderRadius: 30,
  },
});
