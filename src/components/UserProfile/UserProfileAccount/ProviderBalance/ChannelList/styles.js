export const useStyles = theme => ({
  columnTitle: {
    padding: "0 22px",
    marginBottom: 10,
    display: "flex",
    "& p": {
      color: theme.palette.text.lightShadedGray,
      fontSize: 13,
      lineHeight: "16px",
      textTransform: "uppercase",
    },
    "& > div": {
      textAlign: "right",
      "&:first-of-type": {
        display: "flex",
        justifyContent: "space-between",
      },
    },
  },
  avatarContainer: {
    alignItems: "center",
    display: "flex",
  },
  tableData: {
    paddingBottom: 17,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.text.disabledBtnBg,
    margin: "0 22px 20px",
    display: "flex",
    "& > div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      "&:first-of-type": { justifyContent: "space-between" },
    },
  },
  providerChannelDetails: {
    display: "flex",
  },
  avatar: { marginRight: 8 },
  channelName: {
    color: theme.palette.text.darkShadedGray,
    fontSize: 18,
    letterSpacing: 0.23,
    lineHeight: "23px",
  },
  algorithmCount: {
    color: theme.palette.text.lightShadedGray,
    fontSize: 14,
    lineHeight: "18px",
  },
  infoIcon: {
    color: theme.palette.text.disabledBtnBg,
    fontSize: 16,
  },
  availableTokenCount: {
    color: theme.palette.text.darkShadedGray,
    fontSize: 22,
    fontWeight: 200,
    lineHeight: "26px",
  },
});
