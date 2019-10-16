export const useStyles = theme => ({
  providerBalContent: {
    width: "100%",
    margin: 0,
    "& h3": {
      padding: "0 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.gray1,
      margin: 0,
      color: theme.palette.text.darkShadedGray,
      fontSize: 20,
      fontWeight: 400,
      lineHeight: "50px",
    },
  },
  description: {
    padding: "24px 20px 34px",
    color: "#3D3E40",
    fontSize: 16,
    lineHeight: "24px",
    "& p": { fontFamily: theme.typography.primary.main },
  },
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
      "&:first-of-type": { textAlign: "left" },
    },
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
      "&:first-of-type": { justifyContent: "flex-start" },
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
  linkedWalletCount: {
    color: theme.palette.text.darkShadedGray,
    fontSize: 22,
    fontWeight: 200,
    lineHeight: "26px",
  },
  availableTokenCount: {
    color: theme.palette.text.darkShadedGray,
    fontSize: 22,
    fontWeight: 200,
    lineHeight: "26px",
  },
  linkProviderBtn: {
    "& button": {
      borderWidth: "2px !important",
      padding: "9px 10px !important",
    },
  },
  downArrowIcon: { color: theme.palette.text.lightShadedGray },
  paginationContainer: {
    padding: "0 22px",
    marginBottom: 32,
  },
});
