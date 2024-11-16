export const useStyles = (theme) => ({
  appBar: {
    marginTop: 24,
    backgroundColor: theme.palette.text.white,
    boxShadow: "none",
  },
  tabsContainer: {
    "& .MuiTab-textColorPrimary.Mui-selected": { color: theme.palette.text.primary },
    "& .MuiTabs-indicator": { backgroundColor: theme.palette.text.primary },
  },
  tab: {
    padding: 0,
    letterSpacing: 0.54,
    textTransform: "capitalize",
  },
  uploader: {
    padding: "20px 0",
  },
  uploadFromLinkContainer: {
    padding: "60px 64px",
    border: "1px dashed #D6D6D6",
    borderRadius: 4,
    margin: "16px 0 40px",
    backgroundColor: "#F5F5F5",
    "& p": {
      margin: "8px 0 0",
      color: theme.palette.text.mediumShadeGray,
      fontSize: 12,
      fontWeight: 300,
      lineHeight: "24px",
    },
  },
  uploadFromSystemContainer: {
    boxSizing: "border-box",
    width: "100%",
    padding: "60px 64px 24px",
    border: "1px dashed #D6D6D6",
    borderRadius: 4,
    marginTop: 16,
    backgroundColor: "#F5F5F5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > svg": {
      color: theme.palette.text.primary,
      fontSize: 42,
    },
    "& span": {
      margin: "16px 0",
      display: "block",
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      "& a": {
        color: theme.palette.text.primary,
        textDecoration: "none",
      },
    },
    "& p": {
      margin: 0,
      color: theme.palette.text.mediumShadeGray,
      fontSize: 12,
      fontWeight: 300,
      lineHeight: "24px",
    },
    "& div": {
      width: 474,
      padding: "8px 15px",
      marginTop: 24,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.palette.text.white,
      "& svg": {
        color: theme.palette.text.mediumShadeGray,
        fontSize: 16,
      },
    },
  },
});
