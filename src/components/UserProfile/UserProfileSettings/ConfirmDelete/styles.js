import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
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
    display: "flex",
    flexDirection: "column",
    gap: 24,
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
    justifyContent: "center",
  },
  WarningBoxConatiner: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F18D5A",
    backgroundColor: "#FDF3E5",
    borderRadius: 4,
    marginTop: 16,
    padding: "13px 11px",
    "& p": {
      border: "none",
      margin: "0 0 12px",
      padding: 0,
      display: "inline",
      wordBreak: "break-word",
      "&:last-of-type": { marginBottom: 0 },
    },
    "& svg": {
      color: "#FFC200",
      marginRight: 10,
      verticalAlign: "middle",
    },
  },
}));
