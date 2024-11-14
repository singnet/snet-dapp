export const useStyles = (theme) => ({
  card: {
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    backgroundColor: theme.palette.text.white,
    borderRadius: 4,
  },
  cardHeaderContainer: {
    padding: 15,
    borderBottom: `solid 1px #E2E2E2`,
    "& h2": {
      padding: 0,
      margin: 0,
      color: theme.palette.text.darkShadedGray,
      fontSize: 20,
      fontWeight: 400,
    },
  },
  cardContentContainer: {
    padding: "20px 15px",
  },
});
