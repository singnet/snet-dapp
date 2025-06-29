export const useStyles = (theme) => ({
  demoExampleContainer: {
    padding: 30,
    display: "flex",
    flexDirection: "column",
    gap: 30,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  lastPaidCallInfo: {
    margin: 0,
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
