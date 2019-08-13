export const useStyles = theme => ({
  ExpiredSessionContainer: {
    textAlign: "center",
    "& button": {
      marginTop: 36,
      marginRight: "0 !important",
    }
  },
  PurchaseFlowContainer:{ padding: '0 50px 50px' },
  PurchaseFlowDescription:{
  	margin: '33px 0 45px',
  	color: theme.palette.text.alertBoxColor,
  	fontFamily: theme.typography.secondary.main,
  	fontSize: 14,
  	letterSpacing: 0.25,
  	lineHeight: '21px'
  },
  paymentInfoCard:{
  	marginBottom: 25,
  	display: 'flex',
  	justifyContent: 'space-between'
  }
});
