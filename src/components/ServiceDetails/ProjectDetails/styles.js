export const useStyles = (theme) => ({
  projectDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    "& h5": {
      margin: 0,
      color: theme.palette.text.darkShadedGray,
      fontSize: 16,
      fontWeight: 700,
      lineHeight: "22px",
    },
  },
  projectURLContainer: {
    "& > div": {
      display: "flex",
      alignItems: "center",
    },
    "& svg": {
      marginRight: 5,
      color: theme.palette.text.primary,
    },
    "& a": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "block",
      color: theme.palette.text.primary,
      fontWeight: 400,
      letterSpacing: 0.25,
      wordBreak: "break-all",
      textDecoration: "none",
      "&:hover": { textDecoration: "underline" },
    },
  },
});
