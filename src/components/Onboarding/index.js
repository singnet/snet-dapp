import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";

import Authentication from "./Authentication";
import TermsOfUse from "./TermsOfUse";
import Session from "../../utility/stringConstants/Session";
import WalletKey from "./WalletKey";
import { useStyles } from "./styles";
import OnboardingContainer from "./OnboardingContainer";
import Routes from "../../utility/stringConstants/Routes";
import { userActions } from "../../Redux/actionCreators";

class Onboarding extends Component {
    state = {
        verificationCode: "",
        activeSection: 1,
    };

    componentDidMount = () => {
        console.log("mount route", this.props.isWalletAssigned);
        this.props.checkWalletStatus();
        if (this.props.isWalletAssigned) {
            console.log("mount route");
            this.props.history.push(Routes.AI_MARKETPLACE);
        }
        if (this.props.isEmailVerified) {
            this.setState({ activeSection: 2 });
        }
    };

    componentDidUpdate = () => {
        console.log("mount route", this.props.isWalletAssigned);

        if (this.props.isWalletAssigned) {
            console.log("update route");
            this.props.history.push(Routes.AI_MARKETPLACE);
        }
        if (sessionStorage.getItem(Session.USERNAME) && this.state.activeSection === 1) {
            Auth.currentAuthenticatedUser({ bypassCache: true })
                .then(res => {
                    if (res.attributes.email_verified) {
                        this.setState({ activeSection: 2 });
                    }
                })
                .catch(err => {});
        }
    };

    handleNextSection = () => {
        this.setState(prevState => ({
            activeSection: prevState.activeSection + 1,
        }));
    };

    render() {
        console.log("Onboarding", this.props);
        const { classes } = this.props;
        const { activeSection } = this.state;
        const username = sessionStorage.getItem(Session.USERNAME);

        const OnboardingDetails = [
            {
                title: `Welcome ${username}`,
                description: (
                    <p>
                        You have successfully logged into your singularitynet account. <br />
                        You are just steps away from completing your activation.
                    </p>
                ),
                component: <Authentication handleNextSection={this.handleNextSection} />,
            },
            {
                title: `Step 2`,
                description: (
                    <p>
                        You have successfully logged into your singularitynet account. <br />
                        You are just steps away from completing your activation.
                    </p>
                ),
                component: <TermsOfUse handleNextSection={this.handleNextSection} />,
            },
            {
                title: `Step 3`,
                description: (
                    <p>
                        You have successfully logged into your singularitynet account. <br />
                        You are just steps away from completing your activation.
                    </p>
                ),
                component: <WalletKey />,
            },
        ];

        return (
            <div className={classes.onboardingContainer}>
                {OnboardingDetails.map((item, index) => (
                    <OnboardingContainer
                        key={item.title}
                        classes={classes}
                        item={item}
                        active={activeSection === index + 1}
                        activeSection={activeSection}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isEmailVerified: state.userReducer.isEmailVerified,
    isWalletAssigned: state.userReducer.isWalletAssigned,
});

const mapDispatchToProps = dispatch => ({
    checkWalletStatus: () => dispatch(userActions.checkWalletStatus),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(Onboarding));
