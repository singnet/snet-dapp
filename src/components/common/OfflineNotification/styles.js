export const useStyles = theme => ({
  offlineNotification: {
    padding: "7px 4.5% 7px 6.5%",
    backgroundColor: theme.backgroundColor.offlineRedBg,
  },
  notificationText: {
    display: "flex",
    alignItems: "center",
    "& span": {
      "&:first-of-type": {
        color: theme.palette.text.offlineRed,
        fontSize: 8,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: theme.palette.text.offlineRed,
        borderRadius: 50,
        textAlign: "center",
        padding: 4,
        marginRight: 17.5,
      },
      "&:last-of-type": {
        color: theme.palette.text.lightShadedGray,
        fontFamily: theme.typography.secondary.main,
        fontSize: 14.2,
        letterSpacing: 0.25,
        lineHeight: "20px",
      },
    },
  },
  notificationActions: {
    textAlign: "right",
    "& button": { padding: 0 },
    "@media(max-width: 960px)": {
      marginTop: 10,
      textAlign: "left",
    },
  },
});
