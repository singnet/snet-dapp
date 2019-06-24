import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    filterResetBtnContainer: {
        padding: "15px 22px",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: theme.palette.text.gray8,
    },
    h2: {
        color: theme.palette.text.black1,
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
        boxShadow: "none",
        backgroundColor: theme.palette.text.gray9,
    },
    filtersHeadingTitle: {
        color: theme.palette.text.gray7,
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
        color: theme.palette.text.gray4,
        fontFamily: theme.typography.tertiary.main,
        fontSize: 14,
    },
    checkboxLabel: {
        fontFamily: theme.typography.primary.main,
        fontSize: 14,
        letterSpacing: "0.25px",
        color: theme.palette.text.gray4,
    },
}));
