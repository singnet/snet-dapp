export const useStyles = theme => ({
  privateKeyContainer: { padding: "0 25px !important" },
  successMsg: {
    paddingBottom: 20,
    color: theme.palette.text.successBoxBorder,
    fontFamily: theme.typography.primary.main,
    fontSize: 16,
    fontWeight: 600,
  },
  description: {
    fontFamily: theme.typography.primary.main,
    fontSize: 16,
    color: "#2A2A2A",
    lineHeight: "24px",
    "& span": { fontWeight: 600 },
  },
  downloadKeyBtn: {
    paddingTop: 10,
    textAlign: "center",
  },
  btnContainer: {
    marginTop: 35,
    textAlign: "center",
  },
});
