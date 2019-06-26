import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Icon } from "@material-ui/core";
import { useStyles } from "./styles";

const InlineLoader = ({ loading }) => {
    const classes = useStyles();
    return (
        <Fragment>
            {
                <div className={classes.pendingSection}>
                    <Icon className="far fa-hourglass" />
                    <span>Pending</span>
                </div>
            }
        </Fragment>
    );
};

InlineLoader.propTypes = {
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default InlineLoader;
