import newAIServiceBG from "../../assets/images/newAIServiceBG.webp";

export const useStyles = (theme) => ({
  promoWrapper: {
    maxWidth: 1280,
    padding: "0 60px 64px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    "& > div": {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      "&:first-of-type": {
        backgroundImage: `url(${newAIServiceBG})`,
      },
      "&:last-of-type": {
        backgroundImage: `url(${newAIServiceBG})`,
        "@media(max-width:1113px)": { marginTop: 20 },
      },
    },
    "@media(max-width:1113px)": {
      flexDirection: "column",
      alignItems: "center",
    },
    "@media(max-width:790px)": { alignItems: "center" },
  },
  box: {
    boxSizing: "border-box",
    width: "49%",
    padding: "37px 29px 37px 30px",
    borderRadius: 6,
    display: "flex",
    alignItems: "flex-start",
    "& div": {
      marginLeft: 32,
      "& > span": {
        color: "#fff",
        fontSize: 24,
        fontWeight: 600,
        lineHeight: "32px",
        "@media(max-width:600px)": { marginTop: 15, display: "inline-bloxk" },
      },
      "& p": {
        margin: "16px 0 24px",
        color: "#eee",
        fontWeight: 200,
        lineHeight: "26px",
      },
      "& a": {
        padding: "7px 32px",
        border: "1px solid #fff",
        borderRadius: 4,
        display: "inline-block",
        background: "transparent",
        color: "#fff",
        cursor: "pointer",
        fontFamily: "Muli",
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: 1.25,
        lineHeight: "16px",
        textDecoration: "none",
        textTransform: "uppercase",
        "&:hover": { background: "rgba(241,241,241,0.15)" },
      },
      "@media(max-width:600px)": { marginLeft: 0, textAlign: "center" },
    },
    "@media(max-width:1113px)": {
      width: 635,
      marginRight: 20,
    },
    "@media(max-width:790px)": { width: "100%" },
    "@media(max-width:600px)": { flexDirection: "column", alignItems: "center" },
  },
});
