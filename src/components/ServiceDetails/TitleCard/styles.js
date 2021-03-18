export const useStyles = theme => ({
  computerVisionContainer: {
    display: "flex",
    "@media(max-width:490px)": {
      marginTop: 55,
      display: "inline-block",
    },
  },
  companyName: {
    "& h4": {
      display: "block",
      paddingTop: 2,
      margin: 0,
      color: theme.palette.text.primary,
      fontSize: 14,
      lineHeight: "18px",
    },
  },
  providersName: {
    margin: 0,
    fontSize: "10px !important",
    lineHeight: "13px",
  },
  computerVisionContent: {
    marginLeft: 25,
    "& h1": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 38,
      fontWeight: 200,
      "@media(max-width:1024px)": { fontSize: 34 },
    },
    "@media(max-width:768px)": { marginLeft: 17 },
    "@media(max-width:480px)": { marginLeft: 0 },
  },
  ratingStars: {
    "& .dv-star-rating-empty-star": {
      "& i": { color: theme.palette.text.disabledBtnBg, cursor: "default" },
    },
    "& i": {
      color: theme.palette.text.RatingStarColor,
      fontSize: 22,
      paddingRight: 2,
      cursor: "default",
    },
    "& label": { cursor: "default !important" },
  },
  apiCall: {
    padding: "6px 15px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.text.lightGray,
    borderRadius: 4,
    marginLeft: 20,
    color: theme.palette.text.lightShadedGray,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 2,
    verticalAlign: "super",
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 12,
    display: "inline-block",
    "& img": { width: "100%" },
  },
  serviceCreatorDetails: {
    display: "flex",
    alignItems: "center",
    "& p": {
      color: theme.palette.text.lightShadedGray,
      fontSize: 14,
      textTransform: "uppercase",
    },
    "@media(max-width:490px)": {
      marginTop: 20,
    },
  },
  titleImg: {
    width: 234,
    cursor: "pointer",
    "& img": { width: "100%" },
    "@media(max-width:480px)": {
      width: 302,
      margin: "0 auto",
    },
  },
  serviceLightBox: {
    position: "relative",
  },
  serviceImgContainer: {
    boxSizing: "border-box",
    width: 1045,
    height: 666,
    padding: "56px 33px",
    borderRadius: 4,
    position: "absolute",
    top: "50%",
    left: "50%",
    backgroundColor: theme.backgroundColor.white,
    boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    outline: "none",
    transform: "translate(-50%, -50%)",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
    "& svg": {
      position: "absolute",
      top: 10,
      cursor: "pointer",
    },
    "@media(max-width: 1050px)": {
      width: "90%",
      height: "90%",
    },
  },
});
