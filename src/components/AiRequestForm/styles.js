export const useStyles = theme => ({
  aiRequestFormMainContainer: {
    padding: "138px 0 26px",
    backgroundColor: theme.palette.text.purple,
    boxShadow: "0 2px 6px 0 rgba(0,0,0,0.3)",
  },
  aiRequestFormWrapper: {
    "& h2": {
      color: "rgba(255,255,255,0.87)",
      fontSize: 36,
      fontWeight: 600,
      lineHeight: "45px",
      textAlign: "center",
    },
    "& > span": {
      display: "block",
      color: "#FAFAFA",
      fontSize: 18,
      fontWeight: 200,
      lineHeight: "28px",
      textAlign: "center",
    },
  },
  formContainer: {
    width: 736,
    border: "2px solid #FFFFFF",
    margin: "40px auto 0",
    borderRadius: 4,
    backgroundColor: "#F6F6F6",
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    "@media(max-width: 780px)": { width: "90%" },
  },
  aiRequestFormFooterContainer: {
    marginTop: 16,
    "& p": {
      margin: 0,
      color: theme.palette.text.lightShadedGray,
      fontSize: 12,
      letterSpacing: -0.09,
      lineHeight: "15px",
      textAlign: "center",
      "&:last-of-type": { marginTop: 14 },
    },
  },
});
