export const useStyles = theme =>({
	GetStartedMainContaienr:{
		padding: '30px 60px 50px',
		backgroundColor: theme.palette.text.offWhiteColor,
		flexDirection: 'column'
	},
	TopSection:{
		maxWidth: 800,
		margin: '0 auto 30px',	
		textAlign: 'center',
		'& h2':{
			color: theme.palette.text.darkShadedGray,
			fontSize: 32,
			fontWeight: 600,
			lineHeight: '48px'
		},
		'& p':{
			margin: '20px 0 0',
			color: theme.palette.text.mediumShadeGray,
			fontFamily: theme.typography.secondary.main,
			fontSize: 20,
			lineHeight: '30px'
		}
	}
}) 