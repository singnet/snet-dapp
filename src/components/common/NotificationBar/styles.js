export const useStyles = theme => ({
  NotificationBar: { 
    paddingLeft: '0 !important',
    paddingRight: '0 !important'
  },
  notificationText: {
    padding: '8px 0',
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    "& span": {      
      fontFamily: theme.typography.secondary.main,
      fontSize: 14.2,
      letterSpacing: 0.25,
      lineHeight: "20px"
    }
  },
  warning:{    
    backgroundColor: theme.backgroundColor.offlineRedBg,
    color: theme.palette.text.alertBoxColor,
    '& svg': {
      marginRight: 17,
      color: theme.palette.text.offlineRed
    }
  },
  information: {
    backgroundColor: theme.palette.text.informationBg,
    color: theme.palette.text.white,
    '& svg': { marginRight: 21 }
  }
});
