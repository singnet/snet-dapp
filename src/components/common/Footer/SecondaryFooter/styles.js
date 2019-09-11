import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  secondaryFooter: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    marginTop: 11,
    "& div": {
      "@media (max-width:1023px) and (min-width:768px)": { maxWidth: "50%" },
    },
    "@media (max-width:1023px) and (min-width:768px)": {
      padding: "15px 15px 0",
      alignItems: "center",
    },
    "@media (max-width:769px)": {
      paddingTop: 30,
      marginTop: 19,
      flexFlow: "column-reverse",
    },
  },
  copyrightText: {
    margin: 0,
    color: theme.palette.text.white,
    opacity: 0.6,
    fontSize: 12,
    lineHeight: "17px",
    "@media (max-width:1023px) and (min-width:768px)": { width: 353 },
    "@media (max-width:767px)": { textAlign: "center" },
  },
  socialIconsList: {
    padding: 0,
    margin: 0,
    display: "flex",
    justifyContent: "flex-end",
    "& li": {
      "&:first-of-type": {
        "@media (max-width:767px)": { marginLeft: 0 },
      },
    },
    "@media (max-width:767px)": {
      marginBottom: 30,
      justifyContent: "center",
    },
  },
}));
