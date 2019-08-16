import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  card: {
    width: 520,
    margin: "0 auto",
    transform: "translateY(50%)",
  },
  cardHeader: {
    borderRadius: "4px 4px 0 0",
    padding: "5px 22px",
    backgroundColor: theme.palette.text.offWhiteColor,
    "& h2": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 24,
      lineHeight: "28px",
    },
  },
  RatingConatiner: {
    marginBottom: 14,
    display: "flex",
    alignItems: "center",
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
  cardContent: { padding: "20px 43px" },
  cardActions: {
    padding: "0 0 21px",
    justifyContent: "center",
  },
  ReviewTitle: { display: "none" },
  buttonsContainer: {
    marginTop: 10,
    textAlign: "center",
    "& button": {
      padding: " 13px 60px 11px",
      marginTop: 10,
    },
  },
}));
