export const useStyles = theme => ({
  card: {
    maxWidth: 345,
    margin: "200px auto 0",
    textAlign: "center",
    "& h4": {
      margin: 0,
      color: theme.palette.text.darkShadedGray,
      fontFamily: theme.typography.primary.main,
      fontSize: 22,
      fontWeight: 600,
    },
    "& .MuiCardContent-root": {
      padding: "0 20px",
      "& p": { marginBottom: 20 },
    },
  },
});
