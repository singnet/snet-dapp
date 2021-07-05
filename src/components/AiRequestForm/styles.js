import googleFormBG from "../../assets/images/googleFormBG.svg";

export const useStyles = theme => ({
  googleFormMainContainer: {
    backgroundImage: `url(${googleFormBG})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "79% 100%",
    "@media(min-width:1600px)": { backgroundPosition: "85% 100%" },
    "@media(min-width:1800px)": { backgroundPosition: "100%" },
  },
  aiRequestFormMainContainer: {
    padding: "138px 0 26px",
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
    paddingTop: 20,
    border: "2px solid #FFFFFF",
    margin: "40px auto 0",
    borderRadius: 4,
    backgroundColor: "#F6F6F6",
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    "& iframe": {
      height: 1300,
      "@media(max-width: 780px)": { height: 1400 },
      "@media(max-width: 530px)": { height: 1500 },
    },
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
