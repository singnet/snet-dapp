export const useStyles = (theme) => ({
  leftSideSection: {
    display: "flex",
    flexDirection: "column",
    gap: 25,
  },
  requestModelInfoHolder: {
    display: "flex",
    flexDirection: "column",
    gap: 25,
  },
  requestModelInfo: {
    display: "flex",
    "& svg": {
      padding: "3px 8px 0 0",
      color: theme.palette.text.primary,
      fontSize: 16,
    },
    "& p": {
      margin: 0,
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      fontWeight: 300,
      letterSpacing: "0.25px",
      lineHeight: "20px",
    },
  },
});
