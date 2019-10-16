export const useStyles = theme => ({
  totalProviderLinkedContainer: {
    marginTop: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  infoTitleContainer: {
    display: "flex",
    alignItems: "center",
  },
  infoIcon: {
    marginRight: 16,
    color: theme.palette.text.lightShadedGray,
    fontSize: 16,
  },
  totalProviderLinkedTitle: {
    color: theme.palette.text.mediumShadeGray,
    fontSize: 16,
    lineHeight: "20px",
  },
  totalProviderLinkedCount: {
    width: 130,
    padding: "14px 0",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.text.verticalTabLeftBorder,
    borderRadius: 4,
    backgroundColor: theme.palette.text.cardBackground,
    color: theme.palette.text.darkShadedGray,
    fontSize: 16,
    lineHeight: "20px",
    textAlign: "center",
  },
});
