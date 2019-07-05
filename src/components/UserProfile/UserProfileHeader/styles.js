export const useStyles = theme => ({
  userProfileHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 0",
    "& div": {
      marginBottom: 0,
      alignItems: "center",
    },
  },
  requestText: {
    padding: 10,
    borderRadius: 4,
    border: 1,
    borderStyle: "solid",
    borderColor: theme.palette.text.primary,
    color: theme.palette.text.primary,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 1.25,
    lineHeight: "16px",
    textDecoration: "none",
    textTransform: "uppercase",
  },
});
