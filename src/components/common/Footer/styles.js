import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    footer: {
        padding: "18px 0 25px",
        backgroundColor: theme.palette.text.purple,
        color: theme.palette.text.offWhite,
    },
    footerWrapper: {
        width: "75%",
        margin: "0 auto",
    },
}));
