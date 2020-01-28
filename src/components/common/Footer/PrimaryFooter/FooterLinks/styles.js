import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  footerRightSideLinks: {
    display: "flex",
    padding: "13px 0 0 35px",
    width: "100%",
    "@media (max-width:1023px) and (min-width:768px)": {
      width: "auto",
      padding: "13px 0 0 15px",
    },
    "@media (max-width:769px)": {
      width: "auto",
      boxSizing: "border-box",
      display: "inline-block",
      padding: "0 30px",
    },
  },
  footerLinksList: {
    width: 165,
    padding: 0,
    margin: "0 10% 0 0",
    "&:last-of-type": { marginRight: 0 },
    "@media (max-width:1023px) and (min-width:768px)": { width: "30%" },
    "@media (max-width:1279px) and (min-width:768px)": { marginRight: "3%" },
    "@media (max-width:768px)": {
      width: "50%",
      margin: "30px 0px 0 0",
      display: "inline-block",
      verticalAlign: "top",
    },
    "@media (max-width: 414px)": { width: "100%" },
  },
  footerLinks: { listStyle: "none" },
  footerLinkText: {
    color: theme.palette.text.offWhite,
    textDecoration: "none",
    lineHeight: "25px",
  },
  marginLeft: { marginLeft: 35 },
}));
