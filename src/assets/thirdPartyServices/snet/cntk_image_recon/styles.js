export const useStyles = theme => ({
    dropDown: {
      padding: "11px 18px",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "rgba(25,25,25,0.32)",
      borderRadius: 4,
      marginTop: 26,
      position: "relative",
      "& > div": {
        width: "100%",
      },
    },
    dropDownTitle: {
      padding: "0 5px",
      position: "absolute",
      top: "-10px",
      left: 10,
      background: theme.palette.text.white,
      color: theme.palette.text.black1,
      fontSize: 12,
      letterSpacing: 0.4,
    },
    upload: {
      padding: "11px 18px",
      marginTop: 26,
      position: "relative",
      "& > div": {
        width: "100%",
      },
    },
    about: {
      marginTop: 30,
      textAlign: "center",
    },
    invoke: {
      marginTop: 30,
      textAlign: "center",
    },
  });
