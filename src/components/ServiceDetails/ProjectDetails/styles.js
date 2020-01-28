export const useStyles = theme => ({
  projectDetailsContainer: {
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    padding: "0 25px 30px 0",
    borderRadius: 4,
    backgroundColor: theme.palette.text.white,
    "& h3": { marginBottom: 15 },
    "& > div": {
      paddingLeft: 30,
      marginBottom: 30,
      display: "flex",
      "& h5": {
        width: "50%",
        margin: 0,
        color: theme.palette.text.darkShadedGray,
        fontSize: 16,
        fontWeight: 400,
        lineHeight: "22px",
      },
      "& a": {
        display: "block",
        color: theme.palette.text.primary,
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: 0.25,
        wordBreak: "break-all",
        textDecoration: "none",
        "&:hover": { textDecoration: "underline" },
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
    "& p": { marginLeft: "30px !important" },
  },
  projectDetailsContent: { paddingTop: 10 },
  projectURLContainer: {
    width: "100%",
    display: "flex",
    "& svg": {
      paddingTop: 3,
      marginRight: 5,
      color: theme.palette.text.primary,
      fontSize: 14,
    },
    marginTop: 2,
  },
});
