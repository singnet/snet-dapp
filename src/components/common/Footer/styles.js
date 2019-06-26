import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    footer: {
        padding: "18px 0 25px",
        backgroundColor: theme.palette.text.purple,
        color: theme.palette.text.offWhite,
    },
    footerWrapper: {
        width: "75%",
        margin: "0 auto",
    },
    footerLinks: {
        listStyle: "none",
    },
    footerLinkText: {
        color: theme.palette.text.offWhite,
        textDecoration: "none",
        lineHeight: "25px",
    },
    footerLinksTitle: {
        marginBottom: 15,
        display: "inline-block",
        fontSize: 20,
        fontWeight: theme.typography.fontweight,
    },
    socialIconsLink: {
        listStyle: "none",
        marginLeft: 45,
    },
    socialIcon: {
        color: theme.palette.text.white,
        fontSize: 35,
    },
}));
