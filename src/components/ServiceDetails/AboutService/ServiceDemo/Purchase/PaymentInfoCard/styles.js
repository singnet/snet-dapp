export const useStyles = theme => ({
	PaymentInfoCardContainer:{
		display: 'inline-block',
		textAlign: 'right',
		'& svg':{
			color: theme.palette.text.lightShadedGray,
			fontSize: 20,
			verticalAlign: 'middle'
		},
		'& h5':{
			margin: '0 0 0 8px',
			display: 'inline-block',
			color: theme.palette.text.lightShadedGray,
			fontSize: 16,
			lineHeight: '22px'
		},
		'& h3':{
			padding: '0 !important',
			borderbottomWidth: '0 !important',
			margin: 0,
			display: 'inline-block',
			color: theme.palette.text.darkShadedGray,
			fontSize: '28px !important',
			lineHeight: '38px'
		}
	},
	unit:{
		marginLeft: 10,
		display: 'inline-block',
		color: theme.palette.text.lightShadedGray,
		fontSize: 12
	}
})