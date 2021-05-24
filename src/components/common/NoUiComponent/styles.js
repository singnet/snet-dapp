export const useStyles = theme => ({
  noUiComponentContainer: {
    boxSizing: "border-box",
    width: "100%",
    minHeight: "calc(100vh - 335px)",
    padding: "40px 0 60px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    "& img": {
      width: 300,
      margin: "auto",
    },
    "& > span": {
      color: theme.palette.text.mediumShadeGray,
      fontSize: 24,
      fontWeight: 200,
      lineHeight: "30px",
    },
  },
});
