export const useStyles = theme => ({
  CategoryWrapper: {
    marginBottom: 60,
    justifyContent: "space-between",
    "@media(max-width:1024px)": { marginBottom: 0 },
    "@media(max-width:768px)": {
      marginBottom: 30,
      flexDirection: "column",
    },
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
    "@media(max-width:960px)": {
      maxWidth: "100%",
      marginBottom: 25,
    },
  },
  reverseDirection: {
    flexDirection: "row-reverse",
    "& div": {
      "&:last-of-type": { justifyContent: "flex-start" },
    },
    "@media(max-width:768px)": { flexDirection: "column" },
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
      lineHeight: "30px",
    },
  },
  CategoryMedia: {
    display: "flex",
    justifyContent: "flex-end",
    "@media(max-width:1024px)": {
      padding: " 0 10px",
      alignItems: "center",
    },
    "@media(max-width:768px)": { maxWidth: "100%" },
  },
});
