export const useStyles = theme => ({
    demoExampleContainer: {
        padding: "0 !important",
        textAlign: "left !important",
        "& h4": {
            paddingLeft: 22,
            margin: "16px 0 0 0",
            color: theme.palette.text.black1,
            fontSize: 18,
            textAlign: "left",
        },
        "& > div": {
            paddingTop: "25px !important",
            marginTop: 0,
            "& ul": {
                justifyContent: "center",
            },
            "& li": {
                "&::before": {
                    width: 110,
                    marginLeft: 15,
                },
            },
        },
        "& p": {
            padding: "0 22px",
            margin: 0,
            color: theme.palette.text.black1,
            fontFamily: theme.typography.secondary.main,
            fontSize: 14,
            lineHeight: "21px",
            letterSpacing: "0.25px",
        },
    },
});
