export const useStyles = theme => ({
  noDemoComponentContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    "& img": {
      width: "50%",
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
