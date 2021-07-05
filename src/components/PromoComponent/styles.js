import publisherPromoBG from "../../assets/images/publisherPromoBG.svg";
import newAIServiceBG from "../../assets/images/newAIServiceBG.svg";

export const useStyles = theme => ({
  promoWrapper: {
    maxWidth: 1280,
    padding: "0 60px 64px",
    margin: "0 auto",
    display: "flex",
    "& > div": {
      "&:first-of-type": {
        backgroundImage: `url(${newAIServiceBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      "&:last-of-type": {
        backgroundImage: `url(${publisherPromoBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
    },
  },
  box: {
    width: 631,
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
      },
    },
  },
});
