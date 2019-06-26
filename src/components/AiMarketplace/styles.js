export const useStyles = theme => ({
    aiMarketPlaceContainer: {
        backgroundColor: theme.palette.text.gray8,
    },
    mainWrapper: {
        width: "92%",
        margin: "0 auto",
    },
    topSection: {
        marginBottom: 55,
    },
    titleContainer: {
        display: "flex",
        alignItems: "center",
    },
    title: {
        margin: 0,
        color: theme.palette.text.black1,
        fontSize: 42,
        lineHeight: "57px",
    },
    description: {
        padding: "42px 0 21px",
        margin: 0,
        color: theme.palette.text.black1,
        fontFamily: theme.typography.secondary.main,
        fontSize: 24,
        lineHeight: "29px",
    },
    signupLink: {
        textDecoration: "none",
    },
});
