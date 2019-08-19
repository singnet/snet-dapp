export const useStyles = theme => ({
  CategoryWrapper: {
    marginBottom: 60,
    justifyContent: "space-between",
  },
  CategoryContent: {
    maxWidth: "45%",
    paddingTop: 25,
    "& p": {
      margin: "10px 0 27px",
      color: theme.palette.text.mediumShadeGray,
      fontSize: 16,
      lineHeight: "24px",
      "& span": { fontWeight: 600 },
    },
  },
  reverseDirection: {
    flexDirection: "row-reverse",
    "& div": {
      "&:last-of-type": { justifyContent: "flex-start" },
    },
  },
  Title: {
    "& svg": {
      marginRight: 11,
      color: theme.palette.text.grayTitleText,
      fontSize: 30,
      verticalAlign: "bottom",
    },
    "& h3": {
      margin: 0,
      display: "inline-block",
      color: theme.palette.text.darkShadedGray,
      fontSize: 24,
      fontWeight: 600,
      lineHeight: "33px",
    },
  },
  CategoryMedia: {
    display: "flex",
    justifyContent: "flex-end",
  },
});
