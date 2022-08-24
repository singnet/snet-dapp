const modelStatus = {
	IN_PROGRESS: "IN_PROGRESS",
	PUBLISHED: "PUBLISHED"
}
export const useStyles = theme => ({
    modelDetailsContainer: {
			padding: '21px 21px 16px 22px',
			border: '1px solid #ECECEC',
			borderRadius: 4,
			backgroundColor: theme.palette.text.gray1,
			'& p': {
				padding: '8px 0 16px',
				margin: 0,
				color: theme.palette.text.mediumShadeGray,
				fontSize: 14,
				fontWeight: 300,
				lineHeight: '18px',
			}
		},
		titleIdContainer: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			'& h3': {
				margin: 0,
				color: theme.palette.text.darkShadedGray,
  			fontSize: 18,
  			lineHeight: '23px'
			},
			'& p':{
				color: theme.palette.text.darkShadedGray,
				fontSize: 14,
				fontWeight: 400,
				lineHeight: '18px',
				'& span': {
					color: theme.palette.text.mediumShadeGray,
				}
			}
		},
		statusAccessLastUpdateContainer: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			'& > div': {
				display: 'flex',
				alignItems: 'center',
				'& p': {
					color: theme.palette.text.darkShadedGray,
					fontSize: 12,
					fontWeight: 'bold',
					lineHeight: '15px',
					'& span': { color: theme.palette.text.mediumShadeGray },
					[`& span[data-status-type="${modelStatus.IN_PROGRESS}"]`]: { color: '#2CB7CF' },
					[`& span[data-status-type="${modelStatus.PUBLISHED}"]`]: { color: '#0B8E1C' },
					'&:first-of-type': { paddingRight: 33 }
				}
			},
			'& > p': {
				color: theme.palette.text.mediumShadeGray,
				fontSize: 12,
				lineHeight: '15px',
			}
		},
		actionButtons: {
			paddingTop: 16,
			borderTop: '1px solid #ececec',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			'& svg': { 
				paddingRight: 4,
				fontSize: 18 
			},
			'& span': {
				fontSize: 14,
				letterSpacing: 1.3,
				lineHeight: '18px',
				textTransform: 'capitalize'
			}
		},
		updateBtn: { color: theme.palette.text.darkShadedGray },
		testBtn: { color: theme.palette.text.primary },
		deleteBtn: { color: theme.palette.text.redBtnText },
		deleteModalContent: {
			width: 580,
			padding: '30px 22px 24px',
  		borderRadius: 4,
			position: 'absolute',
    	top: '50%',
    	left: '50%',
  		boxShadow: '0 0 2px 0 rgba(0,0,0,0.15), 0 1px 2px 0 rgba(0,0,0,0.15)',
			backgroundColor: theme.palette.text.white,
			transform: 'translate(-50%, -50%)',
			'& h2': {
				color: theme.palette.text.darkShadedGray,
				fontFamily: 'Muli',
				fontSize: 20,
				fontWeight: 600,
				lineHeight: '25px'
			},
			'& p': {
				margin: '8px 0 24px',
				color: theme.palette.text.mediumShadeGray,
				fontFamily: 'Muli',
				fontSize: 14,
				fontWeight: 300,
				lineHeight: '24px'
			}
		},
		deleteModalActions: {
			textAlign: 'right',
			'& button': {
				textTransform: 'initial',
				letterSpacing: 1.3,
				fontWeight: 400,
				'&:last-of-type': { 
					backgroundColor: theme.palette.text.redBtnText,
					'&:hover': { backgroundColor: theme.palette.text.redBtnBg }
				}
			}
		}
  });

  