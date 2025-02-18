export const useStyles = (theme) => ({
  dialogBox: {
    "& .MuiPaper-root": {
      maxWidth: 520,
      width: "100%",
      "& > div": { marginTop: 0 },
    },
    "& .MuiDialogTitle-root": {
      borderRadius: "4px 4px 0 0",
      backgroundColor: theme.palette.text.offWhiteColor,
      "& h3": {
        margin: 0,
        color: theme.palette.text.dialogTitle,
        fontSize: 24,
        lineHeight: "30px",
      },
    },
    "& .MuiDialogContent-root": {
      padding: "32px 75px",
      borderBottomWidth: 0,
      "& .MuiTextField-root": {
        width: "100%",
        marginTop: 0,
      },
      "& svg": {
        marginRight: 12,
        color: theme.palette.text.lightShadedGray,
      },
      "& .MuiTab-labelIcon": { minHeight: "auto" },
      "& .Mui-selected": {
        "& span": { color: theme.palette.text.primary },
      },
      "& .MuiTab-wrapper": {
        flexDirection: "row",
        color: theme.palette.text.lightShadedGray,
        fontSize: 20,
      },
    },
  },
  dialogActions: {
    justifyContent: "center",
    "& button": {
      "&:disabled": { color: "rgba(0,0,0,0.38) !important" },
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  header: {
    padding: "13px 25px",
    backgroundColor: theme.palette.text.offWhiteColor,
    color: theme.palette.text.black1,
    fontSize: 20,
    lineHeight: "25px",
  },
  escrowAccountDetails: {
    padding: "25px",
    display: "flex",
    gap: 20,
    flexDirection: "column",
  },
});
