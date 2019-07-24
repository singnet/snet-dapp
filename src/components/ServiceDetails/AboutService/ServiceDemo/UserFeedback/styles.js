import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  card: { maxWidth: 520 },
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
  buttonsContainer: {
    marginTop: 10,
    textAlign: "center",
    "& button": {
      padding: " 13px 60px 11px",
      marginTop: 10,
    },
  },
}));
