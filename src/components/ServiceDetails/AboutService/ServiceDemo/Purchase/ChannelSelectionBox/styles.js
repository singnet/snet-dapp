export const useStyles = theme => ({
	ChannelSelectionBoxContainer:{
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.text.verticalTabLeftBorder,
		borderRadius: 4,
		backgroundColor: theme.palette.text.cardBackground,
		'&:hover':{
			borderColor: theme.palette.text.primary,
			backgroundColor: 'rgba(64,134,255,0.03)'
		},
	},
	disabledChannelBox:{
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#eee',
		backgroundColor: '#fefefe',
	},
	LeftSideSection:{
		padding: '14px 28px',
		display: 'flex',
		alignItems: 'center'
	},
	RadioButtonContainer:{
		'&.Mui-checked': { color: theme.palette.text.primary }
	},	
	InputDataContainer:{
		'& h2':{
			marginBottom: 8,
			color: theme.palette.text.darkShadedGray,
			fontSize: 22,
			lineHeight: '30px'
		},
		'& input':{
			width: 24,
			padding: '7px',
			borderWidth: 1,
			borderStyle: 'solid',
			borderColor: theme.palette.text.inputBoxBorder,
			borderRadius: 4,
			marginRight: 30,
			backgroundColor: theme.palette.text.whiteColor,
			color: theme.palette.text.mediumShadeGray,
			fontSize: 16,
			'&:disabled': { backgroundColor: theme.palette.text.cardBackground }
		},
		'& span':{
			color: theme.palette.text.lightShadedGray,
			fontSize: 12,
			lineHeight: '17px'
		}
	},
	selectionBoxDescription:{
		padding: '14px 8px',
		borderLeftWidth: 1,
		borderLeftStyle: 'solid',
		borderLeftColor: theme.palette.text.verticalTabLeftBorder,
		display: 'flex',
		alignItems: 'center',
		'& p':{
			paddingLeft: 22,
			margin: 0,
			color: theme.palette.text.mediumShadeGray,
			fontFamily: theme.typography.secondary.main,
			fontSize: 14,
			lineHeight: '21px'
		}
	}
})