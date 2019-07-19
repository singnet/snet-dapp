export const useStyles = theme => ({
  loginHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexBasis: "100%",
    maxWidth: "71%",
    margin: "0 auto",
    padding: "30px 0",
    "& h1": {
      margin: 0,
    },
    "& p": {
      margin: 0,
      color: theme.palette.text.mediumShadeGray,
      fontSize: "16px",
    },
    "& a": {
      display: "inline-block",
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontweight,
      textDecoration: "none",
    },
    "@media (max-width:750px)": {
      width: "75%",
    },
  },
  loginHeaderLink: {
    textAlign: "right",
    "& span": {
      "&:hover": {
        textDecoration: "underline",
      },
    },
    "@media (max-width:750px)": {
      maxWidth: "100%",
      flexBasis: "100%",
      textAlign: "left",
    },
  },
});
