export const useStyles = theme => ({
  finishContaienr: {
    margin: "68px 0 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& svg": {
      marginBottom: 24,
      fontSize: 80,
      color: "#05C38C",
    },
    "& > span": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 20,
      lineHeight: "25px",
    },
    "& p": {
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      fontWeight: 300,
      lineHeight: "24px",
      "&:first-of-type": {
        width: "33%",
        margin: "6px 0 32px",
        textAlign: "center",
      },
      "& span": {
        color: theme.palette.text.darkShadedGray,
        fontSize: 14,
        fontWeight: 800,
        lineHeight: "24px",
      },
    },
  },
  btnContainer: {
    marginTop: 32,
    '& a': { textDecoration: 'none' },
    "& button": {
      "&:first-of-type": { 
        marginRight: 16,
        '@media(max-width: 480px)': { marginBottom: 20 }
    },
    },
    '@media(max-width: 480px)': { 
        display: 'flex',
        flexDirection: 'column'
    }
  },
});
