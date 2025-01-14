export const useStyles = (theme) => ({
  button: {
    "& span": {
      textTransform: "none",
    },
  },
  menuItem: {
    fontFamily: theme.typography.primary.main,
    "& a": {
      textDecoration: "none",
    },
  },
});
