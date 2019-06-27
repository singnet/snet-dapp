import React, { Fragment, Component } from "react";

import LoginOnboardingHeader from "../common/LoginOnboardingHeader";

const withRegistrationHeader = (InputComponent, headerData) => {
    return class extends Component {
        render() {
            return (
                <Fragment>
                    <LoginOnboardingHeader headerData={headerData} />
                    <InputComponent {...this.props} />
                </Fragment>
            );
        }
    };
};

export default withRegistrationHeader;
