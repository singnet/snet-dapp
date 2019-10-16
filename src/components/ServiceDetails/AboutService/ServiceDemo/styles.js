export const useStyles = theme => ({
  demoExampleContainer: {
    padding: "14px 22px 38px !important",
    textAlign: "left !important",
    "& h4": {
      margin: 0,
      color: theme.palette.text.black1,
      fontWeight: 400,
      fontSize: 18,
      textAlign: "left",
    },
    "& > div": {
      "@media (max-width: 1045px)": { width: "auto" },
      "@media (max-width: 480px)": { paddingTop: 20 },
    },
    "& ul": {
      justifyContent: "center",
      "@media(max-width:768px)": { flexDirection: "row" },
    },
    "& li": {
      "& span": {
        "&:first-of-type": {
          "@media(max-width:480px)": { padding: "3px 7px" },
        },
        "@media(max-width:480px)": {
          marginRight: 5,
          fontSize: 12,
        },
      },
      "&::before": {
        width: 110,
        marginLeft: 15,
        "@media (max-width: 938px)": { width: 40 },
        "@media(max-width:480px)": {
          width: 20,
          marginLeft: 5,
          marginRight: 5,
        },
      },
      "@media(max-width:480px)": { marginBottom: 0 },
    },
    "& > p": {
      padding: "0 22px",
      margin: " 30px 0 0",
      color: theme.palette.text.black1,
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
    "& .Mui-checked": { color: theme.palette.text.primary },
    "& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track": { backgroundColor: theme.palette.text.primary },
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
    "& h4": { marginTop: 0 },
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
    "& .MuiTextField-root": { width: 170 },
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
    "& i": { paddingRight: "10px !important" },
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
});
