export const useStyles = theme => ({
  generalAccWalletContainer:{
    padding: '32px 0 35px',
  },
  description:{
    paddingLeft: 20,
    margin: 0,
    color: theme.palette.text.alertBoxColor,
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: '20px'
  },
  paymentChannelAndDetails:{
    marginTop: 35,
    display: 'flex',
    justifyContent: 'space-between'
  },
  paymentChannelDropDownContainer:{ display: 'flex' },
  infoIconContainer: { 
    marginRight: 10,
    alignSelf: 'center',
    color: theme.palette.text.lightShadedGray,
    fontSize: 20,
  },
  paymentChannelDropDown:{
    width: 278,
    padding: '0 10px',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(25,25,25,0.32)',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '& .MuiFormControl-root': { width:'90%' }
  },
  dropDownTitle:{
    padding: '0 5px',
    position: 'absolute',
    top: -11,
    left: 10,    
    backgroundColor: theme.palette.text.white,
    color: theme.palette.text.dialogTitle,
    fontSize: 12,
    letterSpacing: 0.4
  },
  walletIcon: { color: theme.palette.text.lightShadedGray },
  btnsContainer: {
    marginTop: 64,
    textAlign: 'center',
    '& button':{ marginRight: '32px !important' }
  }
});
