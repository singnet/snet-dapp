export const useStyles = theme => ({
  creditsContainer: {
    padding: "12px 0",
    backgroundColor: theme.palette.text.cardBackground,
    border: "1px solid #E2E2E2",
    borderRadius: 4,
    boxSizing: "border-box",
    textAlign: "center",
    "& p": {
      margin: 0,
      color: theme.palette.text.mediumShadeGray,
      lineHeight: "14px",
      paddingTop: 5,
    },
    "& button": {
      marginTop: 10,
      padding: "7px 65px",
    },
    "@media(max-width:768px)": { margin: "17px 0 30px" },
  },
  infoIcon: {
    paddingRight: 12,
    color: theme.palette.text.lightGray,
    fontSize: 20,
    verticalAlign: "sub",
  },
  creditsAndToken: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& div": {
      display: "flex",
      flexDirection: "column",
      "& span": {
        color: theme.palette.text.lightShadedGray,
        fontSize: 14,
        textTransform: "uppercase",
        "&:last-of-type": {
          color: theme.palette.text.purple,
          fontSize: 38,
          lineHeight: "34px",
        },
      },
    },
    "& > span": {
      padding: "20px 25px 0",
      color: theme.palette.text.lightShadedGray,
      fontSize: 24,
    },
  },
});
