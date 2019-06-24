export const useStyles = theme => ({
    onboardingContainer: {
        paddingBottom: 40,
        backgroundColor: theme.palette.text.gray8,
    },
    termsOfUseContainer: {
        width: 630,
        paddingBottom: 40,
        margin: "40px auto 0",
        backgroundColor: theme.palette.text.white,
        boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
        textAlign: "center",
        "& h3": {
            padding: "15px 0 15px 25px",
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
            borderBottomColor: theme.palette.text.gray5,
            margin: 0,
            color: theme.palette.text.black1,
            fontSize: 20,
            textAlign: "left",
        },
        "@media (max-width:724px)": {
            width: "90%",
        },
    },
    termsAndConditions: {
        height: 306,
        padding: "23px 17px",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#f1f1f1",
        margin: "15px 13px 0",
        backgroundColor: theme.palette.text.gray8,
        textAlign: "left",
        color: theme.palette.text.gray3,
        fontSize: 14,
        fontFamily: theme.typography.secondary.main,
        overflow: "auto",
    },
    checkboxAndButton: {
        padding: "30px 15px 0",
        display: "flex",
        justifyContent: "space-between",
        "& button": {
            padding: "13px 61px 11px",
        },
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column",
        },
    },
});
