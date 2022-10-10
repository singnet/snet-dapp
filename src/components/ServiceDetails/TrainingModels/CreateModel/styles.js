export const useStyles = theme => ({
  createModelContainer: {
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
    '& > div': {
      '&:first-of-type': {
        '& ul': {
          justifyContent: 'center',
          '@media(max-width: 570px)': {
            width: '30%',
            margin: '0 auto',
            flexDirection: 'column',
            alignItems: 'flex-start',
            '& li': { 
              '@media(max-width: 570px)': { marginBottom: 10 },
              '&::before': {
                '@media(max-width: 570px)': { display: 'none' }
              }
            }
          }
        },
        '& li::before': { 
          width: 50,
          margin: '0 10px'
        },
        '@media(max-width: 1015px)': { width: '100%' }
      }
    }
	},
  editModelHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& h2': {
      color: theme.palette.text.darkShadedGray,
      fontSize: 16,
      lineHeight: '25px',
      '& span': { fontSize: 18 }
    }
  }
});
