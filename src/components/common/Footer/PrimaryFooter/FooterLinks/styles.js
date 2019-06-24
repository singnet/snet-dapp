import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    footerRightSideLinks: {
        display: "flex",
        padding: "35px 0 0 35px",
        justifyContent: "space-between",
        width: "100%",
    },
    footerLinksList: {
        padding: 0,
        margin: 0,
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
    marginLeft: {
        marginLeft: 35,
    },
}));
