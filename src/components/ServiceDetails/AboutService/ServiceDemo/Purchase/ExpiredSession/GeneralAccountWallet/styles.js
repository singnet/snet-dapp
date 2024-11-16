export const useStyles = (theme) => ({
  btnsContainer: {
    display: "flex",
    gap: 20,
    justifyContent: "space-between",
    "& button": {
      borderWidth: 2,
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
