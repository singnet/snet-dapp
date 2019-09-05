import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  Modal: { overflow: "auto" },
  card: {
    width: 519,
    paddingBottom: 25,
    margin: "0px auto 80px	",
    transform: "translateY(25%)",
  },
  CardHeader: {
    padding: "5px 22px",
    backgroundColor: theme.palette.text.offWhiteColor,
    "& span": {
      color: theme.palette.text.black1,
      fontFamily: theme.typography.primary.main,
      fontSize: 20,
      lineHeight: "23px",
    },
  },
  CardContent: {
    padding: "16px 32px 0",
    "& h2": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 18,
      fontWeight: 400,
      lineHeight: "24px",
    },
    "& p": {
      margin: "16px 0 0",
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      letterSpacing: 0.25,
      lineHeight: "20px",
    },
  },
  CardActions: {
    marginTop: 23,
    justifyContent: "center",
  },
  BeforeYouGoContent: { marginTop: 16 },
  DropDownContainer: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#828282",
    borderRadius: 4,
    position: "relative",
    marginTop: 25,
    padding: "11px 15px",
    "& span": {
      color: "#212121",
      fontSize: 12,
      lineHeight: "16px",
      letterSpacing: 0.4,
      position: "absolute",
      top: -10,
      left: 10,
      background: "#fff",
      display: "inline-block",
      padding: "0 5px",
      "& + div": { width: "100%" },
    },
    "& select": {
      padding: "initial",
      color: "#212121",
    },
  },
  WarningBoxConatiner: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F18D5A",
    backgroundColor: "#FDF3E5",
    borderRadius: 4,
    marginTop: 16,
    padding: "13px 20px",
    "& div": {
      marginBottom: 17,
      display: "flex",
      alignItems: "flex-start",
      "&:last-of-type": { marginBottom: 0 },
    },
    "& p": {
      border: "none",
      margin: "0 0 12px",
      padding: 0,
      display: "inline",
      "&:last-of-type": { marginBottom: 0 },
    },
    "& svg": {
      color: "#FFC200",
      marginRight: 12,
      verticalAlign: "middle",
    },
  },
  inputFieldContainer: {
    marginTop: 35,
    "& > div": {
      width: "100%",
      "& div": {
        "&.MuiSelect-select": { padding: "28px 0" },
      },
    },
    "& div": {
      "&.MuiTextField-root": { marginTop: 28 },
    },
  },
  menuItem: {
    color: theme.palette.text.black1,
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: "28px",
    "&:hover": {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.text.offWhiteColor,
    },
  },
}));
