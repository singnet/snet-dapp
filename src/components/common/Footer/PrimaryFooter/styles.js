import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    PrimaryFooter: {
        width: "100%",
        display: "flex",
    },
    footerLogoSection: {
        textAlign: "right",
        borderRightWidth: 1,
        borderRightStyle: "solid",
        padding: "15px 35px 15px 0",
        margin: 0,
    },
}));
