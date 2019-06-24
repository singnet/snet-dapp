import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    card: {
        padding: "10px 0 15px",
        position: "relative",
        boxShadow: "none",
        backgroundColor: theme.palette.text.gray8,
        "&:nth-child(2n)": {
            borderTop: 1,
            borderBottom: 1,
            borderTopStyle: "solid",
            borderBottomStyle: "solid",
            borderTopColor: theme.palette.text.gray13,
            borderBottomColor: theme.palette.text.gray13,
            borderRadius: 4,
            backgroundColor: theme.palette.text.white,
        },
    },
    cardHeader: {
        padding: "0 18px",
    },
    cardTitle: {
        fontWeight: theme.typography.fontweight,
        fontSize: 12,
        color: theme.palette.text.secondary,
        textTransform: "uppercase",
        letterSpacing: 2,
        fontFamily: theme.typography.primary.main,
    },
    cardSubheader: {
        color: theme.palette.text.black1,
        fontWeight: theme.typography.fontweight,
        fontSize: 20,
        letterSpacing: 0.25,
        fontFamily: theme.typography.primary.main,
    },
    cardContent: { padding: "0 13px" },
    cardTypograpy: {
        color: theme.palette.text.gray2,
        fontFamily: theme.typography.secondary.main,
        fontSize: 14,
        lineHeight: "20px",
    },
    cardActions: {
        position: "absolute",
        right: 27,
        top: "50%",
        transform: "translateY(-50%)",
    },
    showMore: {
        padding: 0,
        margin: 0,
    },
    ratedCount: {
        marginLeft: 10,
        display: "inline-block",
        color: theme.palette.text.secondary,
        fontSize: 12,
        fontWeight: theme.typography.fontweight,
        letterSpacing: 2,
        verticalAlign: "super",
    },
}));
