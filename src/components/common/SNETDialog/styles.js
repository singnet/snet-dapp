export const useStyles = (MUITheme) => ({
  dialogTitle: {
    padding: "16px 24px !important",
    color: MUITheme.palette.blue,
    display: "flex",
    alignItems: "center",
    gap: 5,
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
  titleText: {
    fontSize: 20,
    fontWeight: 400,
    lineHeight: "24px",
  },
  iconButton: {
    padding: "0 !important",
    "& svg": { fontSize: 24 },
  },
  dailogContent: {
    padding: "0 !important",
  },
  mobileDialog: {
    position: "absolute",
    borderRadius: "10px 10px 0 0",
    bottom: 0,
    right: 0,
    width: "100%",
  },
  titleMobileText: {
    padding: 10,
    borderBottom: `1px solid ${MUITheme.palette.text.gray}`,
  },
});
