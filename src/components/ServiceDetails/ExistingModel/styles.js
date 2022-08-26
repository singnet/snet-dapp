export const useStyles = theme => ({
  existingModelContainer: {
    borderRadius: 4,
    margin: '25px 0',
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    backgroundColor: theme.palette.text.white,		
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
    "@media(max-width:768px)": {
      padding: "17px 22px",
      flexDirection: "column",
    },
  },
  btnContainer: {
    textAlign: 'center',
    '& button': { margin: '24px 0' }
  }
});
