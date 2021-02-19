import ArrowRight from "../../../assets/images/arrowRight.svg";
import ArrowRightHover from "../../../assets/images/arrowRightHover.svg";
import ArrowLeft from "../../../assets/images/arrowLeft.svg";
import ArrowLeftHover from "../../../assets/images/arrowLeftHover.svg";

export const useStyles = theme => ({
  serviceListingHeaderContainer: {
    padding: "20px 10px 25px",
    background: "linear-gradient(to top, rgb(34, 15, 72) 0%, rgb(58, 13, 76) 100%)",
    "@media(max-width:768px)": { padding: "20px 10px 25px" },
  },
  headerWrapper: {
    maxWidth: 1280,
    margin: "0 auto",
    position: "relative",
    "& .slick-slider": { position: "static" },
  },
  sliderContainer: {
    padding: "0 110px",
    "& .slick-arrow": {
      width: 53,
      height: 64,
      backgroundColor: "rgba(255,255,255,.9) !important",
      backgroundSize: "35px !important",
      backgroundRepeat: "no-repeat !important",
      backgroundPosition: "center !important",
      boxShadow: "2px -1px 2px 0 rgba(0,0,0,0.4)",
      opacity: "5%",
      "&:before": { content: "' '" },
      "&:hover": { opacity: 1 },
      "@media(max-width:480px)": { display: "none !important" },
    },
    "& .slick-next": {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      right: 0,
      backgroundImage: `url(${ArrowRight}) !important`,
      "&:hover": { backgroundImage: `url(${ArrowRightHover}) !important` },
    },
    "& .slick-prev": {
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      left: 0,
      backgroundImage: `url(${ArrowLeft}) !important`,
      "&:hover": { backgroundImage: `url(${ArrowLeftHover}) !important` },
    },
    "@media(max-width:840px)": { padding: "0 70px" },
    "@media(max-width:768px)": { padding: 0 },
  },
  headerContentDetails: {
    display: "flex !important",
    alignItems: "center",
    outline: "none",
    "@media(max-width:768px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  reverseDirection: {
    flexDirection: "row-reverse",
    "& > div": {
      "@media(max-width:768px)": {
        "& > div": { width: "100%" },
      },
    },
  },
  headerMedia: {
    display: "flex",
    "& img": {
      width: "100%",
      "@media(min-width: 1106px) and (max-width:1280px)": { width: "85%" },
    },
    "@media(max-width:768px)": { display: "none" },
  },
  details: {
    padding: "26px 0 26px 24px",
    display: "flex",
    alignItems: "center",
    "& h2": {
      padding: "8px 0 20px",
      color: theme.palette.text.white,
      fontWeight: 600,
      fontSize: 32,
      lineHeight: "40px",
      "@media(max-width:768px)": { fontSize: 30 },
      "@media(max-width:480px)": {
        fontSize: 24,
        textAlign: "center",
      },
    },
    "& p": {
      margin: "0 0 32px",
      color: "#EEE",
      fontWeight: 200,
      fontSize: 18,
      lineHeight: "26px",
      "& span": {
        paddingTop: 30,
        display: "block",
      },
      "@media(max-width:768px)": { fontSize: 16 },
      "@media(max-width:480px)": {
        fontSize: 14,
        textAlign: "center",
      },
    },
    "@media(max-width:768px)": {
      maxWidth: "100%",
      width: "100%",
      flexBasis: "100%",
      padding: 0,
      "& > div": { width: "100%" },
    },
    "@media(max-width:480px)": {
      maxWidth: "100%",
      padding: 0,
    },
  },
  featuredServiceContainer: {
    "& span": {
      fontSize: 14,
      lineHeight: "18px",
      "&:first-of-type": {
        position: "relative",
        backgroundColor: "#220D3A",
        padding: "4px 24px 4px 8px",
        color: "#FFC200",
        letterSpacing: 0.4,
        "&::after": {
          content: "' '",
          width: 18,
          height: 23,
          display: "inline-block",
          backgroundColor: "#371150",
          transform: "rotate(40deg)",
          position: "absolute",
          right: -11,
          top: -2,
        },
      },
      "&:last-of-type": {
        marginLeft: 8,
        opacity: "0.75",
        color: "#989898",
        fontWeight: 600,
        letterSpacing: 1.25,
      },
      "& svg": {
        fontSize: 20,
        verticalAlign: "middle",
      },
    },
  },
  headerButtons: {
    "& a": {
      "&:last-of-type": {
        marginLeft: "4%",
        "@media(max-width:962px)": { marginLeft: 5 },
        "@media(max-width:768px)": { marginLeft: 24 },
        "@media(max-width:480px)": {
          margin: "16px auto",
          display: "block",
        },
      },
      "@media(max-width:962px)": { padding: "7px 15px" },
    },
    "@media(max-width:768px)": { textAlign: "center" },
  },
  titleDescription: {
    borderTop: "1px solid #A389D4",
    padding: "22px 110px 0",
    marginTop: 22,
    "& > div": {
      "@media(max-width:480px)": { maxWidth: "100%" },
    },
    "& h2": {
      color: theme.palette.text.white,
      fontWeight: 600,
      fontSize: 32,
      letterSpacing: -0.64,
      lineHeight: "40px",
      textAlign: "right",
      "@media(max-width:768px)": {
        fontSize: 24,
        textAlign: "center",
      },
    },
    "& p": {
      margin: 0,
      paddingLeft: 24,
      "@media(max-width:768px)": { padding: 0 },
      "& span": {
        display: "block",
        color: "#EEE",
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "23px",
        "@media(max-width:768px)": { fontWeight: 200 },
      },
    },
    "@media(max-width:768px)": {
      flexDirection: "column",
      textAlign: "center",
      padding: "14px 10px 0",
      marginTop: 9,
      "& > div": {
        maxWidth: "100%",
        flexBasis: "100%",
      },
    },
  },
});
