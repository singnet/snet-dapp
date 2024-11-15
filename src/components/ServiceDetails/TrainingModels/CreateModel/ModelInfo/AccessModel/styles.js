export const useStyles = (theme) => ({
  accessModelContainer: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    "& > span": {
      marginLeft: 53,
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      fontWeight: 300,
      lineHeight: "24px",
    },
  },
  ethAddressContainer: {
    margin: "30px 0 0 53px",
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
    "& > div:first-of-type": {
      width: 370,
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
    "& span": {
      boxSizing: "border-box",
      width: 370,
      padding: "17px 15px",
      border: "1px solid #828282",
      borderRadius: 4,
      marginRight: 24,
      display: "inline-block",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& svg": { color: "#D6201F" },
  },
  addTextBox: {
    marginTop: 16,
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.primary,
    cursor: "pointer",
    "& svg": {
      marginRight: 10,
      fontSize: 20,
      cursor: "pointer",
    },
    "& span": { fontSize: 14 },
  },
});
