export const useStyles = theme => ({
  btnsContainer: {
    margin: "64px 0 0",
    display: "flex",
    justifyContent: "center",
    "& button": {
      marginTop: "0 !important",
      borderWidth: 2,
    },
    "& > button": {
      marginLeft: 32,
      "@media(max-width:940px)": {
        marginLeft: 0,
        marginTop: "25px !important",
      },
    },
    "& a > button": {
      "@media(max-width:940px)": { width: "100%" },
    },
    "@media(max-width:940px)": { flexDirection: "column" },
  },
  routerLink: {
    textDecoration: "none",
  },
});
