import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  cardItemsContainer: {
    flexWrap: "nowrap",
    "@media(max-width: 768px)": { flexDirection: "column" },
  },
  card: {
    padding: 10,
    position: "relative",
    boxShadow: "none",
    borderTop: 1,
    borderTopStyle: "solid",
    borderTopColor: theme.palette.text.cardSeparator,
    borderRadius: 4,
    backgroundColor: theme.palette.text.white,
    "&:hover": {
      backgroundColor: theme.palette.text.offWhiteColor,
      "& .MuiCardHeader-title": { color: theme.palette.text.primary },
    },
  },
  mediaContainer: { maxWidth: "100% !important" },
  CardMedia: {
    width: 214,
    height: 120,
  },
  cardHeader: {
    padding: "0 10px",
    position: "relative",
    alignItems: "center",
    textAlign: "left",
    "& button": {
      color: theme.palette.text.primary,
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 1.25,
    },
    "& .MuiCardHeader-avatar": { marginRight: 10 },
    "@media(max-width: 1280px)": { padding: "0 0 0 16px" },
  },
  cardTitle: {
    display: "inline-block",
    color: theme.palette.text.darkShadedGray,
    fontSize: 20,
    letterSpacing: 0.25,
    padding: "0 9px 0 0px",
    textAlign: "left",
    fontFamily: theme.typography.primary.main,
    "& h4": { margin: "0 76px 0 0" },
    "@media(max-width: 768px)": { width: "100%" },
  },
  cardSubheader: {
    fontSize: 12,
    color: theme.palette.text.lightShadedGray,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontFamily: theme.typography.primary.main,
    fontWeight: 600,
  },
  cardContent: {
    padding: "0 10px",
    "&:last-of-type": { paddingBottom: 0 },
    "@media(max-width: 1280px)": { padding: "0 0 0 16px" },
  },
  cardTypograpy: {
    marginTop: 16,
    color: theme.palette.text.mediumShadeGray,
    fontFamily: theme.typography.primary.main,
    fontSize: 14,
    lineHeight: "20px",
    textAlign: " left",
    "@media(max-width: 1280px)": { marginTop: 5 },
  },
  showMore: {
    padding: 0,
    margin: 0,
  },
  ratingStars: {
    "& .dv-star-rating-empty-star": {
      "& i": {
        color: theme.palette.text.disabledBtnBg,
        fontSize: 21,
      },
    },
    "& i": {
      color: theme.palette.text.RatingStarColor,
      fontSize: 21,
    },
  },
  ratingSection: {
    display: "flex",
    alignItems: "center",
    "@media(max-width:768px)": {
      marginBottom: 10,
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  cardActions: {
    position: "absolute",
    top: 10,
    right: 20,
    "@media(max-width: 1280px)": {
      padding: 0,
      display: "flex",
      justifyContent: "flex-end",
      position: "static",
      "& button": { padding: "5px 8px" },
    },
  },
}));
