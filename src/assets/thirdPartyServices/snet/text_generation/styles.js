export const useStyles = theme => ({
	description:{
		'& p':{
			margin: '25px 0 0',
			color: 'rgba(0,0,0,0.60)',
			fontSize: 14,
			letterSpacing: 0.3,
			lineHeight: '21px',
		},
		'& a':{ 
			color: theme.palette.text.primary,
			fontWeight: 600,
			textDecoration: 'none',
		}		
	},
	header:{
		paddingTop: 10,
    borderTop: 1,
    borderTopStyle: 'solid',    
    borderTopColor: theme.palette.text.disabledBtnBg,
    marginTop: 45,
    
    '& h4':{
    	padding: '0 15px',
    	fontSize: 18,
    	color: theme.palette.text.black1
    	
    }
	},
	infoIcon:{
		paddingRight: 12,
  	color: theme.palette.text.lightGray,
  	verticalAlign: 'middle',
	},
	textArea:{
		padding: '0 30px 0 4px',
		marginTop: 25,
		'& svg': { paddingTop: 10 },
		'& div': { width: '94%' }
	},
	title:{
		marginRight: 20,
		fontSize: 14,
		color: theme.palette.text.mediumShadeGray,
		letterSpacing: 0.13,
		lineHeight: '24px'
	},
	progressBarContainer:{ 
		marginTop: 60,
		display: 'flex' 
	},
	sliderContainer:{
		maxWidth: '60%', 
		display: 'flex',
		'& .MuiSlider-root':{ color: theme.palette.text.primary }
	},
	startEndNumber:{
		width: 41,
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: theme.palette.text.inputBoxBorder,
		display: 'inline-block',
		fontSize: 16,
		color: theme.palette.text.black1,
		letterSpacing: 0.15,		
		lineHeight: '24px',
		textAlign: 'center'
	},
	errorMsg:{ margin: '25px 0 10px' },
	btnContainer: { 
		textAlign: 'center',
		'& button':{
			'&:first-of-type': { padding: '13px 0 11px' },
			'&:last-of-type': { padding: '13px 68px 11px' },
		}		
	}
})