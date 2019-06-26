import { makeStyles } from "@material-ui/styles";

export const useStyles = theme => ({
    signupMainContent: {
        width: "71%",
        paddingBottom: 50,
        margin: "0 auto",
    },
    signupContent: {
        width: "71%",
        margin: "0 auto",
    },
    signupInfo: {
        paddingRight: 100,
        "@media (max-width:960px)": {
            paddingRight: 0,
        },
        "& h2": {
            margin: 0,
            color: theme.palette.text.darkShadedGray,
            fontSize: 36,
        },
        "& p": {
            margin: "40px 0 40px",
            color: theme.palette.text.mediumShadeGray,
            fontFamily: theme.typography.secondary.main,
            fontSize: 20,
            lineHeight: "30px",
        },
        "& ul": {
            margin: 0,
            padding: 0,
        },

        "& li": {
            marginBottom: 15,
            listStyle: "none",
            "& span": {
                marginRight: 15,
                color: theme.palette.text.green,
                fontSize: 20,
            },
            "& p": {
                color: theme.palette.text.mediumShadeGray,
                fontFamily: theme.typography.secondary.main,
                fontSize: 16,
                letterSpacing: "0.29px",
                display: "inline-block",
                margin: 0,
                width: "84%",
                verticalAlign: "top",
            },
        },
    },
    signupForm: {
        boxSizing: "border-box",
        width: 410,
        padding: "20px 20px 30px",
        margin: "0 auto",
        boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
        "& h3": {
            margin: "0 0 11px",
            color: theme.palette.text.darkShadedGray,
            fontSize: 16,
            letterSpacing: "0.29px",
            textAlign: "center",
            textTransform: "uppercase",
        },
        "& button": { width: "100%" },
        "@media (max-width:960px)": {
            width: "95%",
            marginTop: 35,
        },
    },
    horizontalLine: {
        marginTop: 15,
        display: "block",
        color: theme.palette.text.darkShadedGray,
        fontSize: 14,
        textTransform: "uppercase",
        textAlign: "center",
        "&::before": {
            content: '" "',
            display: "inline-block",
            verticalAlign: "middle",
            width: 160,
            height: 1,
            backgroundColor: theme.palette.text.gray5,
            marginRight: 10,
        },
        "&::after": {
            content: '" "',
            display: "inline-block",
            verticalAlign: "middle",
            width: 160,
            height: 1,
            marginLeft: 10,
            backgroundColor: theme.palette.text.gray5,
        },
    },
    textField: {
        width: "100%",
        marginBottom: 0,
        display: "inline-block",
        "& label": {
            fontFamily: theme.typography.primary.main,
        },
        "& div": {
            width: "100%",
        },
    },
    charCount: {
        color: theme.palette.text.mediumShadeGray,
        fontFamily: theme.typography.secondary.main,
        fontSize: "12.17px",
        letterSpacing: "0.4px",
    },
    usernameError: {
        color: theme.palette.text.errorRed,
        fontFamily: theme.typography.secondary.main,
        fontSize: "12.17px",
        letterSpacing: "0.4px",
    },
    passwordTxt: {
        color: theme.palette.text.mediumShadeGray,
        fontFamily: theme.typography.secondary.main,
        fontSize: "12.17px",
        letterSpacing: "0.4px",
    },
    // checkboxSection: {
    //     textAlign: "center",
    //     "& p": {
    //         display: "inline-block",
    //         color: theme.palette.text.gray4,
    //     },
    //     "& a": {
    //         color: theme.palette.text.primary,
    //         fontSize: 14,
    //         textDecoration: "none",
    //     },
    // },
    buttonsContainer: {
        marginTop: 10,
        "& button": {
            padding: " 13px 60px 11px",
            marginTop: 10,
        },
    },
    confirmOtp: {
        width: 410,
        margin: "0 auto",
    },
});
