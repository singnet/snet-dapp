import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  cardItemsContainer: {
    flexWrap: "nowrap",
    "@media(max-width: 480px)": { flexDirection: "column" },
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
      "& .MuiCardHeader-title": { color: theme.palette.text.primary },
    },
  },
  mediaContainer: { maxWidth: "100% !important" },
  CardMedia: {
    width: 214,
    height: 120,
  },
  cardHeader: {
    padding: "6px 10px 0",
    alignItems: "center",
    textAlign: "left",
    "& button": {
      color: theme.palette.text.primary,
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 1.25,
    },
    "& .MuiCardHeader-avatar": { marginRight: 10 },
  },
  cardTitle: {
    display: "inline-block",
    color: theme.palette.text.darkShadedGray,
    fontWeight: theme.typography.fontweight,
    fontSize: 20,
    letterSpacing: 0.25,
    padding: "0px 9px 8px 0px",
    textAlign: "left",
    "& h4": { margin: "0 76px 0 0" },
    "@media(max-width: 768px)": { width: "100%" },
  },
  cardSubheader: {
    fontWeight: theme.typography.fontweight,
    fontSize: 12,
    color: theme.palette.text.lightShadedGray,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: 600
  },
  cardContent: {
    padding: "8px 10px 0",
    "&:last-of-type": { paddingBottom: 0 },
  },
  cardTypograpy: {
    color: theme.palette.text.mediumShadeGray,
    fontSize: 14,
    lineHeight: "20px",
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
}));
