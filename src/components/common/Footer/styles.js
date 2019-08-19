import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  footer: {
    padding: "23px 0",
    backgroundColor: theme.backgroundColor.footerBgColor,
    color: theme.palette.text.offWhite,
    "@media (max-width:767px)": { padding: "21px 0 52px" },
  },
  footerWrapper: {
    width: "83%",
    margin: "0 auto",
    "@media (max-width:1279px) and (min-width:1024px)": { width: "98%" },
    "@media (max-width:1023px)": { width: "100%" },
  },
  footerLinks: { listStyle: "none" },
  footerLinkText: {
    color: theme.palette.text.white,
    fontSize: 14,
    lineHeight: "28px",
    opacity: 0.6,
    textDecoration: "none",
    "&:hover": { opacity: 1 },
  },
  footerLinksTitle: {
    marginBottom: 8,
    display: "inline-block",
    color: theme.palette.text.white,
    fontSize: 20,
    fontWeight: 600,
    "@media (max-width:1023px) and (min-width:768px)": {
      fontSize: 18,
    },
  },
  socialIconsLink: {
    listStyle: "none",
    marginLeft: 45,
  },
  socialIcon: {
    color: theme.palette.text.white,
    opacity: 0.6,
    "& span": {
      fontSize: 20,
      "@media (max-width:767px)": {
        fontSize: 14,
      },
    },
    "&:hover": { opacity: 1 },
  },
}));
