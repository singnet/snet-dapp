import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    filterContainer: {
        boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    },
    filterResetBtnContainer: {
        padding: "15px 22px",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: theme.palette.text.offWhiteColor,
    },
    h2: {
        color: theme.palette.text.darkShadedGray,
    },
    resetBtn: {
        border: "none",
        backgroundColor: "transparent",
        color: theme.palette.text.primary,
        cursor: "pointer",
        fontSize: 14,
        outline: "none",
        textTransform: "uppercase",
        fontFamily: theme.typography.primary.main,
    },
    filterExpansionPanel: {
        marginBottom: 1,
        boxShadow: "none",
        backgroundColor: theme.palette.text.gray,
        "&::before": {
            position: "static",
        },
    },
    filtersHeadingTitle: {
        color: theme.palette.text.darkShadedGray,
        fontSize: 16,
        fontFamily: theme.typography.primary.main,
    },
    filterDetails: {
        backgroundColor: theme.palette.text.white,
        flexDirection: "column",
    },
    formCntrlGrup: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& svg": {
            color: "#4086FF !important",
        },
    },
    count: {
        color: theme.palette.text.mediumShadeGray,
        fontFamily: theme.typography.tertiary.main,
        fontSize: 14,
    },
    checkboxLabel: {
        fontFamily: theme.typography.primary.main,
        fontSize: 14,
        letterSpacing: "0.25px",
        color: theme.palette.text.mediumShadeGray,
    },
}));
