export const useStyles = (theme) => ({
  tagsHolder: {
    display: "flex",
    gap: 20,
    alignItems: "baseline",
  },
  tagsContainer: {
    display: "flex",
    gap: 10,
  },
  tag: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.text.lightGray,
    borderRadius: 16,
    padding: "5px 15px",
    color: theme.palette.text.lightShadedGray,
    fontSize: 12,
    letterSpacing: "0.21px",
    lineHeight: "20px",
  },
});
