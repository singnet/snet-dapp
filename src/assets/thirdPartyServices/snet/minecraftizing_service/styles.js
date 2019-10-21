export const useStyles = theme => ({
  container: {
    padding: "0 22px",
    display: "flex",
    flexDirection: "column",
    "& button": { alignSelf: "center" },
  },
  dropDown: {
    padding: "0px 0px 0px 0px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(25,25,25,0.32)",
    borderRadius: 4,
    marginBottom: "5px",
    height: "30px",
    width: "250px",
    fontSize: "13px",
    position: "relative",
    "& > div": {
      width: "100%",
    },
  },
  uploader: {
    padding: "11px 18px",
    marginTop: 26,
    position: "relative",
    "& > div": {
      width: "100%",
    },
  },
  invoke: {
    marginTop: 30,
    textAlign: "center",
    "& button": {
      "&:first-of-type": { padding: "13px 0 11px" },
      "&:last-of-type": { padding: "13px 68px 11px" },
    },
  },
});

