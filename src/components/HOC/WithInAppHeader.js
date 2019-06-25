import React, { Component, Fragment } from "react";

import Header from "../common/Header";
import Footer from "../common/Footer";

const withInAppHeader = InputComponent => {
    console.log("withInAppHeader");
    return class extends Component {
        render() {
            return (
                <Fragment>
                    <Header />
                    <InputComponent {...this.props} />
                    <Footer />
                </Fragment>
            );
        }
    };
};

export default withInAppHeader;
