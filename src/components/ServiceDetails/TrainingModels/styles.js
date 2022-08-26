export const useStyles = theme => ({
  trainingModelContainer: {
    paddingTop: 11,
    marginBottom: 25,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: theme.palette.text.verticalTabLeftBorder,
  },
  leftSideSection: {
    paddingRight: 25,
    "@media(max-width:768px)": {
      maxWidth: "100%",
      paddingRight: 0,
    },
  },
  rightSideSection: {
    "@media(max-width:768px)": {
      maxWidth: "100%",
      marginTop: 25,
    },
  },
  requestModelContainer: {
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    backgroundColor: theme.palette.text.white,
    borderRadius: 4,
    paddingBottom: 20,
    "& h2": {
      padding: "11px 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.gray1,
      margin: 0,
      color: theme.palette.text.darkShadedGray,
      fontSize: 20,
      fontWeight: 400,
    },
    "& div": {
			padding: '22px 22px 24px',
			display: 'flex',
			"& svg": {
				padding: '3px 8px 0 0',
				color: theme.palette.text.primary,
				fontSize: 16,
			},
      "& p": {
        margin: 0,
				color: theme.palette.text.mediumShadeGray,
        fontSize: 14,
				fontWeight: 300,        
        letterSpacing: "0.25px",
        lineHeight: "20px",
      },
    },
		"& button": { marginLeft: 22 }
  },
});
