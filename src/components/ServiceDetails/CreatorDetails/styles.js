export const useStyles = (theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  companyInfo: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  companyName: {
    wordBreak: "break-word",
    "& h3": {
      margin: 0,
      color: theme.palette.text.primary,
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: "0.23px",
      lineHeight: "24px",
    },
    "& span": {
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
    },
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.text.cardBackground,
    color: theme.palette.text.mediumShadeGray,
    fontSize: 14,
    cursor: "pointer",
    "& span": {
      display: "inline-block",
      verticalAlign: "middle",
      cursor: "pointer",
      "& svg": { verticalAlign: "middle" },
    },
    height: 56,
  },
  avatar: {
    width: 72,
    height: 72,
    display: "inline-block",
    "& img": { width: "100%" },
  },
});
