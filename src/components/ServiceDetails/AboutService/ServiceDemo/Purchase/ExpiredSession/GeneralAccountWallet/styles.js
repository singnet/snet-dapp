export const useStyles = (theme) => ({
  btnsContainer: {
    display: "flex",
    gap: 20,
    width: "100%",
    "& a > button": {
      "@media(max-width:940px)": { width: "100%" },
    },
    "@media(max-width:940px)": { flexDirection: "column" },
  },
  routerLink: {
    textDecoration: "none",
  },
});
