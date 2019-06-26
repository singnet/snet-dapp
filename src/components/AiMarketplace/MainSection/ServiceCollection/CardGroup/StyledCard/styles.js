import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    card: {
        width: 302,
        padding: "13px 0",
        margin: "0 20px 20px 0",
        display: "inline-block",
    },
    cardHeader: {
        padding: "0 18px",
    },
    cardTitle: {
        fontWeight: theme.typography.fontweight,
        fontSize: 12,
        color: theme.palette.text.lightShadedGray,
        textTransform: "uppercase",
        letterSpacing: 2,
        fontFamily: theme.typography.primary.main,
    },
    cardSubheader: {
        color: theme.palette.text.darkShadedGray,
        fontWeight: theme.typography.fontweight,
        fontSize: 20,
        letterSpacing: 0.25,
        fontFamily: theme.typography.primary.main,
    },
    CardMedia: {
        height: 175,
        margin: "5px 0 13px",
    },
    cardContent: { padding: "0 13px" },
    cardTypograpy: {
        color: theme.palette.text.mediumShadeGray,
        fontFamily: theme.typography.secondary.main,
        fontSize: 14,
        lineHeight: "20px",
    },
    cardActions: {
        padding: "16px 13px 0",
        justifyContent: "space-between",
    },
    detailsBtn: {
        padding: 0,
        fontFamily: theme.typography.primary.main,
        fontSize: 14,
        fontWeight: theme.typography.fontweight,
        letterSpacing: "1.25px",
        color: theme.palette.text.primary,
    },
    showMore: {
        padding: 0,
        margin: 0,
        color: theme.palette.text.lightShadedGray,
    },
    ratedCount: {
        marginLeft: 10,
        display: "inline-block",
        color: theme.palette.text.lightShadedGray,
        fontSize: 12,
        fontWeight: theme.typography.fontweight,
        letterSpacing: 2,
        verticalAlign: "super",
    },
}));
