export const useStyles = (theme) => ({
  accessModelContainer: {
    display: "flex",
    flexDirection: "column",
    "& > span": {
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      fontWeight: 300,
      lineHeight: "24px",
    },
  },
  ethAddressContainer: {
    display: "flex",
    flexDirection: "column",
    "& > span": {
      marginBottom: 16,
      display: "inline-block",
      color: theme.palette.text.darkShadedGray,
      fontSize: 14,
      lineHeight: "18px",
    },
  },
  addMoreEthAdd: {
    display: "flex",
    // justifyContent: "space-between",
    alignItems: "center",
    gap: 30,
    "& > div:first-of-type": {
      width: 500,
      margin: 0,
      "& input": {
        padding: "19.7px 14px",
        color: theme.palette.text.mediumShadeGray,
        fontSize: 14,
        "&::placeholder": {
          color: theme.palette.text.mediumShadeGray,
          opacity: 1,
        },
      },
      "@media(max-width: 570px)": { width: "100%" },
    },
  },
  addedEthAdd: {
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    gap: 30,
  },
  removeAddressButton: {
    cursor: "pointer",
    "& svg": { color: theme.palette.text.redBtnBg },
  },
  addTextBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.text.primary,
    color: theme.palette.text.white,
    borderRadius: 20,
    width: 30,
    height: 30,
    cursor: "pointer",
    "& svg": {
      fontSize: 20,
      cursor: "pointer",
    },
    "& span": { fontSize: 14 },
    "&:hover": {
      background: theme.palette.text.customHoverBlue,
    },
  },
  addressField: {
    width: 500,
  },
});
