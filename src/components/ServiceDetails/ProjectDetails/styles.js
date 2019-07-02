export const useStyles = theme => ({
  projectDetailsContainer: {
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    padding: "0 25px 30px 0",
    borderRadius: 4,
    marginTop: 30,
    backgroundColor: theme.palette.text.white,
    "& h3": { marginBottom: 15 },
    "& > div": {
      paddingLeft: 30,
      marginBottom: 30,
      display: "flex",
      "& h5": {
        width: 150,
        margin: 0,
        color: theme.palette.text.darkShadedGray,
        fontSize: 16,
        lineHeight: "22px",
      },
      "& div": {
        marginLeft: 20,
      },
      "& a": {
        display: "block",
        color: theme.palette.text.primary,
        fontSize: 14,
        fontFamily: theme.typography.secondary.main,
        fontWeight: 600,
        textDecoration: "none",
      },
      "& p": {
        margin: 0,
        color: theme.palette.text.mediumShadeGray,
        fontSize: 14,
      },
      "&:last-of-type": { marginBottom: 0 },
    },
  },
  contributors: {
    "& p": {
      marginLeft: "30px !important",
    },
  },
});
