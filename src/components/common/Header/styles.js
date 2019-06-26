import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    header: {
        width: "100%",
        alignItems: "center",
        display: "flex",
        backgroundColor: theme.palette.text.purple,
        padding: "15px 6%",
    },
    h1: {
        margin: 0,
    },
    logoAnchor: {
        display: "inline-block",
    },
    logoIcon: {
        width: "100%",
    },
    navUl: {
        padding: 0,
        margin: 0,
        display: "flex",
    },
    navLinks: {
        marginRight: 26,
        listStyle: "none",
    },
    navLinksAnchor: {
        textDecoration: "none",
        fontSize: 20,
        color: theme.palette.text.secondary,
    },
    navLinksDropDown: {
        listStyle: "none",
        "& label": {
            top: "-17px",
            color: theme.palette.text.lightShadedGray,
            "& + div": {
                margin: 0,
                "& svg": {
                    right: "-35px",
                    color: theme.palette.text.lightShadedGray,
                    fontSize: 30,
                },
            },
        },
    },
    activeTab: {
        paddingBottom: 12,
        fontWeight: theme.typography.fontweight,
        borderBottomWidth: "2px",
        borderBottomStyle: "solid",
        borderBottomColor: theme.palette.text.white,
        color: theme.palette.text.white,
    },
    loginBtnsUl: {
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        "& a": {
            textDecoration: "none",
        },
    },
    loginBtnsLi: {
        marginRight: 26,
        listStyle: "none",
    },
    signupBtn: {
        padding: "7px 12px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: theme.palette.text.white,
        borderRadius: 4,
        marginRight: 0,
    },
    loginBtnsAnchor: {
        textDecoration: "none",
        fontSize: 20,
        color: theme.palette.text.white,
    },
    signupBtnText: {
        fontWeight: theme.typography.fontweight,
        letterSpacing: 1.79,
        lineHeight: "16px",
    },
    UppercaseText: { textTransform: "uppercase" },
}));
