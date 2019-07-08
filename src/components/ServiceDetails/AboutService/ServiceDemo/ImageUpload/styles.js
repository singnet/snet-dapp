export const useStyles = theme => ({
  imageUploadContainer: {
    width: 377,
  },
  imageUploadFromContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& h4": {
      display: "inline-block",
      margin: "0 !important",
    },
    "& span": {
      color: theme.palette.text.lightShadedGray,
      fontSize: 16,
    },
    "& button": {
      marginRight: "0 !important",
      padding: "0 !important",
    },
  },
  upload: {
    color: "#4086ff !important",
    fontWeight: 600,
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.text.primary,
  },
  imageUploaderBox: {
    padding: "66px 47px",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: theme.palette.text.lightGray,
    borderRadius: 4,
    marginTop: 10,
    backgroundColor: theme.palette.text.cardBackground,
    color: theme.palette.text.lightShadedGray,
    fontSize: 12,
    lineHeight: "18px",
    textAlign: "center",
    "& i": {
      color: theme.palette.text.primary,
      display: "block",
      fontSize: 29,
    },
    "& a": {
      color: theme.palette.text.primary,
      fontWeight: 600,
      textDecoration: "none",
    },
    "& p": {
      padding: 0,
      margin: "20px 0 0",
    },
  },
});
