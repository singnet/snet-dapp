import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  cardItemsContainer: {
    flexWrap: "nowrap",
  },
  card: {
    padding: 10,
    position: "relative",
    boxShadow: "none",
    borderTop: 1,
    borderTopStyle: "solid",
    borderTopColor: theme.palette.text.cardSeparator,
    borderBottom: 1,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.text.cardSeparator,
    borderRadius: 4,
    backgroundColor: theme.palette.text.white,
    "&:hover": {
      backgroundColor: theme.palette.text.offWhiteColor,
      "& h4": { color: theme.palette.text.primary },
    },
  },
  mediaContainer: {
    maxWidth: "100% !important",
  },
  CardMedia: {
    width: 214,
    height: 120,
  },
  cardHeader: {
    padding: "0 10px",
  },
  cardTitle: {
    fontWeight: theme.typography.fontweight,
    fontSize: 12,
    color: theme.palette.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontFamily: theme.typography.primary.main,
  },
  cardSubheader: {
    margin: "8px 0",
    display: "inline-block",
    color: theme.palette.text.darkShadedGray,
    fontWeight: theme.typography.fontweight,
    fontSize: 20,
    letterSpacing: 0.25,
    fontFamily: theme.typography.primary.main,
    padding: "0px 9px 0px 0px",
  },
  cardContent: {
    padding: "0 10px",
    "&:last-of-type": { paddingBottom: 0 },
  },
  cardTypograpy: {
    color: theme.palette.text.mediumShadeGray,
    fontFamily: theme.typography.secondary.main,
    fontSize: 14,
    lineHeight: "20px",
  },
  cardActions: {
    position: "absolute",
    right: 27,
    top: 50,
    transform: "translateY(-50%)",
    "& button": {
      color: theme.palette.text.primary,
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 1.25,
    },
  },
  showMore: {
    padding: 0,
    margin: 0,
  },
  ratingStars: {
    "& .dv-star-rating-empty-star": {
      "& i": {
        color: theme.palette.text.disabledBtnBg,
        fontSize: "28px",
      },
    },
    "& i": {
      color: theme.palette.text.RatingStarColor,
      fontSize: "28px",
    },
  },
}));
