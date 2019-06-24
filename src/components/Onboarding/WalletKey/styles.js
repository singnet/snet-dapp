export const useStyles = theme => ({
    walletKeyContainer: {
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
        "& p": {
            padding: "30px 53px 0",
            margin: 0,
            color: theme.palette.text.gray3,
            fontFamily: theme.typography.secondary.main,
            fontSize: 14,
            lineHeight: "21px",
            textAlign: "left",
            "& span": {
                fontWeight: theme.typography.fontweight,
            },
        },
        "@media (max-width:724px)": {
            width: "90%",
        },
    },
    warningBox: {
        borderRadius: 4,
        padding: "10px 20px",
        margin: "5px 0 20px",
        display: "inline-block",
        backgroundColor: theme.palette.text.orange1,
        "& i": {
            marginRight: 18,
            color: theme.palette.text.darkOrange,
        },
        "& span": {
            color: theme.palette.text.darkOrange,
            fontFamily: theme.typography.secondary.main,
            fontSize: 14,
        },
    },
    continueBtnContainer: {
        "& button": {
            padding: "13px 60px",
        },
    },
    privateKey: {
        marginBottom: "15px !important",
        textAlign: "center !important",
    },
});
