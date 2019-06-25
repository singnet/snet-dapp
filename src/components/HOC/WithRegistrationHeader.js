import React, { Fragment, Component } from "react";

import LoginOnboardingHeader from "../common/LoginOnboardingHeader";

const withRegistrationHeader = (InputComponent, { headerTitle, headerPath, headerText }) => {
    return class extends Component {
        render() {
            return (
                <Fragment>
                    <LoginOnboardingHeader title={headerTitle} linkPath={headerPath} linkText={headerText} />
                    <InputComponent {...this.props} />
                </Fragment>
            );
        }
    };
};

export default withRegistrationHeader;
