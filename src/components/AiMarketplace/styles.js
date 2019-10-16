export const useStyles = theme => ({
  aiMarketPlaceContainer: {
    backgroundColor: theme.palette.text.offWhiteColor,
    "@media(min-width: 1281px)": {
      width: 1281,
      margin: "0 auto",
    },
    "@media(min-width: 1024px) and (max-width: 1280px)": {
      width: 1024,
      margin: "0 auto",
    },
    "@media(min-width: 768px) and (max-width: 1024px)": {
      width: 768,
      margin: "0 auto",
    },
  },
  mainWrapper: {
    width: "92%",
    margin: "0 auto",
    "@media(max-width: 1280px)": { width: "98%" },
    "@media(min-width: 1281px)": { width: "100%" },
  },
  topSectionCotainer: {
    "@media(max-width: 1024px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  titleContainer: {
    "@media(max-width: 1024px)": { maxWidth: "100%" },
  },
  title: {
    margin: "33px 0 0 0",
    color: theme.palette.text.darkShadedGray,
    fontSize: 32,
    lineHeight: "57px",
    "@media(min-width: 1281px)": { padding: "0 35px" },
    "@media(max-width: 1280px)": { marginTop: 16 },
    "@media(max-width: 1024px)": { fontSize: 28 },
    "@media(max-width: 768px)": { marginTop: 0 },
  },
  descriptionContainer: {
    "@media(max-width: 1024px)": {
      maxWidth: "100%",
      textAlign: "center  ",
    },
  },
  description: {
    padding: "41px 40px 20px 0",
    margin: 0,
    color: theme.palette.text.darkShadedGray,
    fontSize: 22,
    lineHeight: "30px",
    "& span": { fontWeight: 600 },
    "& p": {
      margin: "5px 0 0",
      fontWeight: 200,
    },
    "@media(max-width: 1280px)": {
      paddingRight: 0,
      paddingTop: 16,
    },
    "@media(max-width: 1024px)": { paddingTop: 0 },
  },
  signupLink: {
    textDecoration: "none",
  },
});
