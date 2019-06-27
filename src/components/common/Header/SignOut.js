import React from "react";
import { connect } from "react-redux";

import { userActions } from "../../../Redux/actionCreators";
import { useStyles } from "./styles";

const SignOut = props => {
    const classes = useStyles();

    const handleSignOut = () => {
        props.signOut();
    };

    return (
        <li className={`${classes.signupBtn} ${classes.loginBtnsLi}`}>
            <span
                className={`${classes.loginBtnsAnchor} ${classes.UppercaseText} ${classes.signupBtnText}`}
                onClick={handleSignOut}
            >
                {" "}
                Sign Out
            </span>
        </li>
    );
};

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(userActions.signOut),
});

export default connect(
    null,
    mapDispatchToProps
)(SignOut);
