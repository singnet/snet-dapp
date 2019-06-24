import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    secondaryFooter: {
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopStyle: "solid",
        marginTop: 11,
    },
    copyrightText: {
        margin: 0,
        fontSize: 14,
        lineHeight: "19px",
    },
    socialIconsList: {
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "flex-end",
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
