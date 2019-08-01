export const useStyles = theme => ({
  CategoryWrapper: { marginBottom: 60 },
  CategoryContent: {
    "& p": {
      margin: "10px 0 27px",
      color: theme.palette.text.mediumShadeGray,
      fontFamily: theme.typography.secondary.main,
      fontSize: 16,
      lineHeight: "24px",
      "& span": { fontWeight: 600 },
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
});
