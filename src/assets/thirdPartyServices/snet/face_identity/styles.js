export const useStyles = theme => ({
  description:{
    '& p':{
      margin: '29px 0 0',
      color: theme.palette.text.alertBoxColor,
      fontSize: 14,
      letterSpacing: 0.25,
      lineHeight: '21px'
    }      ,
    '& a':{
      color: theme.palette.text.primary,
      fontWeight: 600,
      textDecoration: 'none',
    }
  },
  header: {
    paddingTop: 10,
    borderTop: 1,
    borderTopStyle: "solid",
    borderTopColor: theme.palette.text.disabledBtnBg,
    marginTop: 45,
    "& h4": {
      padding: "0 15px",
      fontSize: 18,
      color: theme.palette.text.black1,
    },
  },
  imageUploaderContainer:{
    marginTop: 30,
    '& > div':{  minWidth: '100% !important' },
    '& h6':{ marginBottom: '0 !important' },
    '& .MuiTabs-flexContainer':{
      '& .Mui-selected':{        
        color: theme.palette.text.primary,
        fontWeight: 600
      },
      '& button':{
        minWidth: 'fit-content !important',
        paddingBottom: 0,
        flexGrow: 0
      },
      '& .MuiTabs-indicator':{
        bottom: 6,
        backgroundColor: theme.palette.text.primary
      }
    }
  },
  btnContainer:{ textAlign: 'center' },
  infoIcon: {
    paddingRight: 12,
    color: theme.palette.text.lightGray,
    verticalAlign: "middle",
  },
  runTabDescription: {
    margin: "25px 0",
    fontSize: 14,
    color: theme.palette.text.mediumShadeGray,
    letterSpacing: 0.25,
    lineHeight: "20px",
  },
  resultsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& h4": { fontSize: "20 !important" },
    "& svg": {
      display: "none",
      color: theme.palette.text.lightShadedGray,
    },
  },
  resultsContent: {
    padding: "0 0 10px",
    borderRadius: 4,
    marginBottom: 40,
    backgroundColor: theme.palette.text.cardBackground,
  },
  imgContainer: {
    width: 514,
    height: 293,
    margin: "0 auto",
    display: 'flex',
    alignItems: 'center',
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  },
  resultDetails: {
    padding: "18px 0",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.text.lightGray,
    margin: "0 10px",
    display: "flex",
  },
  resultTitle: {
    color: theme.palette.text.darkShadedGray,
    fontSize: 14,
  },
  resultValue: {
    color: theme.palette.text.mediumShadeGray,
    fontSize: 14,
  },
  NoOfFaceDetected:{
    display: 'flex',
    flexDirection: 'column'
  }
});
