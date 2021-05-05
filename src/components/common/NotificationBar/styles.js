export const useStyles = theme => ({
  NotificationBar: {
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
  },
  notificationText: {
    padding: "8px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& span": {
      fontSize: 14.2,
      letterSpacing: 0.25,
      lineHeight: "20px",
    },
  },
  WARNING: {
    backgroundColor: "#FCE5E8",
    color: theme.palette.text.alertBoxColor,
    "& svg": {
      marginRight: 17,
      color: theme.palette.text.offlineRed,
    },
  },
  INFORMATION: {
    backgroundColor: theme.palette.text.informationBarBg,
    color: theme.palette.text.white,
    "& svg": { marginRight: 21 },
  },
});
