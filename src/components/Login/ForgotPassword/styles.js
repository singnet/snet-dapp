export const useStyles = theme => ({
    loginHeader: {
        width: "71%",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "30px 0",
        "& h1": {
            margin: 0,
        },
        "& p": {
            color: "#9b9b9b",
            fontSize: "16px",
        },
        "& a": {
            color: "#4086ff",
            textDecoration: "none",
        },
        ["@media (max-width:750px)"]: {
            width: "75%",
        },
    },
    loginHeaderLink: {
        textAlign: "right",
        "& a": {
            "&:hover": {
                textDecoration: "underline",
            },
        },
        ["@media (max-width:750px)"]: {
            maxWidth: "100%",
            flexBasis: "100%",
            textAlign: "left",
        },
    },
    forgotPwdContent: {
        textAlign: "center",
        "& h2": {
            margin: 0,
            fontSize: "36px",
            color: theme.palette.text.black1,
        },
        "& p": {
            margin: "17px 0 0",
            color: theme.palette.text.gray3,
            fontSize: "22px",
            fontFamily: theme.typography.secondary.main,
        },
        ["@media (max-width:527px)"]: {
            width: "75%",
            margin: "0 auto",
            flexBasis: "90%",
        },
    },
    forgotPwdForm: {
        boxSizing: "border-box",
        width: 410,
        padding: "40px 20px 30px",
        margin: "45px auto 0",
        boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
        "& button": { width: "100%" },
        "& p": { marginBottom: 10 },
        ["@media (max-width:527px)"]: {
            width: "100%",
        },
    },
    textField: {
        width: "100%",
        margin: "0 0 10px 0",
    },
});
