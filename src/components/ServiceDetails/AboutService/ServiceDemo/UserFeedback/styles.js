import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  card: {
    width: 520,
    margin: "0 auto",
    transform: "translateY(10%)",
    "&:focus": { outline: "none" },
    "@media(max-width: 540px)": { width: "90%" },
  },
  cardHeader: {
    borderRadius: "4px 4px 0 0",
    padding: "5px 22px",
    backgroundColor: theme.palette.text.offWhiteColor,
    "& h2": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 24,
      lineHeight: "30px",
      fontWeight: 400,
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
  cardContent: { padding: "15px 43px" },
  cardActions: {
    padding: "0 0 21px",
    justifyContent: "center",
  },
  buttonsContainer: {
    marginTop: 10,
    textAlign: "center",
    "& button": {
      padding: " 13px 60px 11px",
      marginTop: 10,
    },
  },
  InputWrapper: {
    "& span": {
      paddingLeft: 11,
      color: theme.palette.text.mediumShadeGray,
      fontSize: 12,
      letterSpacing: 0.4,
    },
    "& > div": {
      "& textarea": { minHeight: 200 },
    },
  },
  snackbar: {
    background: "#4caf50",
    color: theme.palette.text.white,
    padding: "10px 15px",
    borderRadius: 5,
    top: 20,
    right: -100,
    bottom: "auto",
    left: "auto",
  },
  ratingConatiner: {
    "& p": {
      "& span:last-of-type": { display: "none" },
    },
  },
}));
