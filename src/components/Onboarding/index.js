import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Auth } from "aws-amplify";

import Authentication from "./Authentication";
import TermsOfUse from "./TermsOfUse";
import Session from "../../utility/stringConstants/Session";
import WalletKey from "./WalletKey";
import { useStyles } from "./styles";
import OnboardingContainer from "./OnboardingContainer";

class Authorization extends Component {
    state = {
        verificationCode: "",
        activeSection: 1,
    };

    componentDidMount = () => {
        Auth.currentAuthenticatedUser({ bypassCache: true })
            .then(res => {
                if (res.attributes.email_verified) {
                    this.setState({ activeSection: 2 });
                }
            })
            .catch(err => {
                console.log("onboarding err", err);
            });
    };

    componentDidUpdate = () => {
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

    handleLogout = () => {
        Auth.signOut()
            .then(data => {
                sessionStorage.removeItem(Session.USERNAME);
            })
            .catch(err => console.log(err));
    };

    render() {
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

export default withStyles(useStyles)(Authorization);
