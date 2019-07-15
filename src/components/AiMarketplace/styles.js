export const useStyles = theme => ({
    aiMarketPlaceContainer: {
        backgroundColor: theme.palette.text.gray8,
    },
    mainWrapper: {
        width: "92%",
        margin: "0 auto",
        "@media(max-width: 1279px)": { width: "98%" },
    },
    topSectionCotainer: {
        "@media(max-width: 1023px)": {
            flexDirection: "column",
            alignItems: "center",
        },
    },
    titleContainer: {
        "@media(max-width: 1023px)": { maxWidth: "100%" },
    },
    title: {
        margin: "33px 0 0 0",
        color: theme.palette.text.darkShadedGray,
        fontSize: 32,
        lineHeight: "57px",
        "@media(max-width: 1023px)": {
            fontSize: 28,
            marginTop: 15,
        },
        "@media(max-width: 768px)": { marginTop: 0 },
    },
    descriptionContainer: {
        "@media(max-width: 1023px)": {
            maxWidth: "100%",
            textAlign: "center  ",
        },
    },
    description: {
        padding: "41px 40px 20px 0",
        margin: 0,
        color: theme.palette.text.darkShadedGray,
        fontFamily: theme.typography.secondary.main,
        fontSize: 22,
        lineHeight: "30px",
        "@media(max-width: 1279px)": { paddingRight: 0 },
        "@media(max-width: 1023px)": { paddingTop: 0 },
    },
    signupLink: {
        textDecoration: "none",
    },
});
