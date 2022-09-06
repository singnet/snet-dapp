export const useStyles = theme => ({
  modelDataContaienr: {
    padding: "60px 33px 24px 24px",
  },
  createDatasetContainer: {
    "& span": {
      color: theme.palette.text.darkShadedGrey,
      fontSize: 14,
      lineHeight: "18px",
    },
    "& p": {
      margin: "8px 0 40px",
      color: theme.palette.text.mediumShadedGrey,
      fontSize: 14,
      fontWeight: 300,
      lineHeight: "24px",
    },
    "& div": {
      width: 180,
      borderRadius: 4,
			margin: "0 auto",
      backgroundColor: theme.palette.text.white,
      boxShadow: "0 0 2px 0 rgba(0,0,0,0.15), 0 1px 2px 0 rgba(0,0,0,0.15)",      
      textAlign: "center",
      "& > span": {
        margin: '13px 0 16px',
				display: 'inline-block',
        color: theme.palette.text.mediumShadedGrey,
        fontSize: 12,
        fontWeight: 300,
        lineHeight: "15px",
      },
			'& button': {
				width: '100%',
				padding: '11px 18px',
				borderRadius: 0,
				'& span': { textTransform: 'capitalize' }
			}
    },
  },
	uploadDatasetContainer: {
		marginTop: 40,
		'& > span': {
			color: theme.palette.text.darkShadedGrey,
			fontSize: 14,
			fontWeight: 'bold',
			lineHeight: '18px',
		}
	},
  btnContainer: { textAlign: 'center' }
});
