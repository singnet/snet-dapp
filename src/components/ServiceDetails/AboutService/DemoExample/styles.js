export const useStyles = theme => ({
  demoExampleContainer: {
    padding: "0 22px !important",
    textAlign: "left !important",
    "& h4": {
      margin: "16px 0 0 0",
      color: theme.palette.text.black1,
      fontSize: 18,
      textAlign: "left",
    },
    "& ul": {
      justifyContent: "center",
    },
    "& li": {
      "&::before": {
        width: 110,
        marginLeft: 15,
      },
    },
    "& > p": {
      padding: "0 22px",
      margin: " 30px 0 0",
      color: theme.palette.text.black1,
      fontFamily: theme.typography.secondary.main,
      fontSize: 14,
      lineHeight: "21px",
      letterSpacing: "0.25px",
    },
  },
  uploadImageContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: 0,
    paddingTop: 25,
  },
  switch: {
    "& .Mui-checked": {
      color: theme.palette.text.primary,
    },
    "& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track": {
      backgroundColor: theme.palette.text.primary,
    },
  },
  parametersContainer: {
    paddingTop: "10px !important",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: theme.palette.text.lightGray,
    marginTop: "10px !important",
  },
  parameterHeader: {
    display: "flex",
    justifyContent: "space-between",
    "& h4": {
      marginTop: 0,
    },
    "& button": {
      padding: 0,
      marginRight: "0 !important",
    },
  },
  parameters: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& .fa-info-circle": {
      padding: "12px 0",
      color: theme.palette.text.primary,
      fontSize: 18,
    },
    "& .MuiTextField-root": {
      width: 170,
    },
  },
  switchContainer: {
    display: "flex",
    textItems: "center",
  },
  switchLabel: {
    paddingLeft: 15,
    color: theme.palette.text.black1,
    fontSize: 14,
  },
  optimationRounds: {
    display: "flex",
    alignItems: "center",
    "& i": {
      paddingRight: "10px !important",
    },
  },
  demoContainerButtons: {
    textAlign: "center",
    paddingBottom: 20,
    "& button": {
      marginRight: "0 !important",
      paddingLeft: 70,
      paddingRight: 70,
    },
  },
  demoComponent: {
    textAlign: "center",
    "& div:first-child": {
      display: "inline-block",
    },
    "& .row": {
      display: "flex !important",
      "& a": {
        minWidth: 64,
        minHeight: 36,
        boxSizing: "border-box",
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontWeight: 500,
        borderRadius: 4,
        textTransform: "uppercase",
      },
      "& .col-md-6 ": {
        textAlign: "center !important",
        "& button": {
          color: "white",
          borderColor: "#4086ff",
          padding: "6px 14px",
          backgroundColor: "#4086ff",
          borderRadius: 6,
          display: "inline-block",
          position: "relative",
          left: "50%",
          marginLeft: 95,
          marginBottom: 10,
        },
      },
    },
  },
});
