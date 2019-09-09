export const useStyles = theme => ({
  computerVisionContainer: { 
    display: "flex",
    '@media(max-width:490px)': { display: 'inline-block' }
  },
  computerVisionContent: {
    marginLeft: 25,    
    "& h2": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 38,
      fontWeight: 200,
      '@media(max-width:1024px)': { fontSize: 34 }
    },
    '@media(max-width:490px)': { textAlign:' center' },
    '@media(max-width:768px)': { marginLeft: 17 }
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
    marginRight: 12,
    display: "inline-block",
    "& img": {
      width: 40,
      height: 40,
    },
    '@media(max-width:768px)': { display: 'none' }
  },
  serviceCreatorDetails: {
    display: "flex",
    alignItems: "center",
    "& span": {
      color: theme.palette.text.lightShadedGray,
      fontSize: 14,
      textTransform: "uppercase",
    },
    '@media(max-width:490px)': { 
      marginTop: 20,
      justifyContent: 'center'
    }
  },
  titleImg: {
    width: 234,
    "& img": { width: "100%" },
    '@media(max-width:490px)': { margin: '0 auto' }
  },
});
