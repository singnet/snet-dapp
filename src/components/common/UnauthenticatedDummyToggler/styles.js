export const useStyles = (theme) => ({
  unauthenticatedDummy: {
    margin: "0  auto",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    textAlign: "center",
    "& p": { margin: 0 },
  },
  imgContainer: {
    width: 260,
    margin: "0 auto",
    "& img": { width: "100%" },
  },
  unauthenticatedDummyTitle: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    "& p": {
      color: theme.palette.text.mediumShadeGray,
      fontSize: 24,
      fontWeight: 200,
      lineHeight: "30px",
    },
    "& span": {
      color: "#989898",
      fontSize: 14,
      lineHeight: "18px",
    },
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 15,
  },
});
