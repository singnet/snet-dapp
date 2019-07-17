import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  PrimaryFooter: {
    width: "100%",
    display: "flex",
    "@media (max-width:1023px)": {
      display: "inline-block",
    },
  },
  footerLogoSection: {
    textAlign: "right",
    borderRightWidth: 1,
    borderRightStyle: "solid",
    padding: "0 30px 0 0",
    margin: 0,
    "& img": {
      "@media (max-width:1023px)": {
        width: 140,
        marginRight: 52,
      },
    },
    "& li": {
      "&:first-of-type": {
        "@media (max-width:1023px)": {
          marginRight: 0,
        },
      },
      "&:last-of-type": {
        "@media (max-width:1023px)": {
          marginRight: 0,
        },
      },
      "@media (max-width:1023px)": {
        marginRight: 25,
      },
    },
    "@media (max-width:1023px)": {
      padding: "0 15px 10px",
      borderRight: "none",
      borderBottom: 1,
      borderBottomStyle: "solid",
      display: "flex",
      alignItems: "center",
      textAlign: "inherit",
    },
    "@media (max-width:1023px) and (min-width:768px)": {},
  },
}));
