import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

const useStyles = theme => ({
    errorText: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.backgroundColor.red,
        padding: "13px 20px",
        backgroundColor: theme.backgroundColor.red,
        color: theme.palette.text.gray2,
        fontSize: "14px !important",
        fontFamily: theme.typography.secondary.main,
        textAlign: "left",
    },
});

const ErrorMsgBox = ({ classes, showErr, errorMsg }) => {
    return <Fragment>{showErr ? <p className={classes.errorText}>{errorMsg}</p> : null}</Fragment>;
};

ErrorMsgBox.propTypes = {
    showErr: PropTypes.bool | PropTypes.string,
    errorMsg: PropTypes.string,
};

export default withStyles(useStyles)(ErrorMsgBox);
