export const useStyles = theme => ({
  FeaturesWrapper: {
    textAlign: "center",
    "& h2": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 32,
      fontWeight: 600,
      lineHeight: "48px",
    },
  },
  FeatureContainer: {
    marginTop: 30,
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
