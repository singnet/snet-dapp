export const useStyles = theme => ({
    onboardingContainer: {
        paddingBottom: 40,
        backgroundColor: theme.palette.text.gray8,
    },
    topSection: {
        textAlign: "center",
        "& h2": {
            color: theme.palette.text.black1,
            fontSize: 32,
            fontWeight: theme.typography.fontweight,
        },
        "& p": {
            margin: "20px 0 0",
            color: theme.palette.text.gray3,
            fontFamily: theme.typography.secondary.main,
            fontSize: 20,
            lineHeight: "30px",
        },
    },
});
