import React, { Component } from "react";

import AlertBox, { alertTypes } from "../../../common/AlertBox";
import { connect } from "react-redux";
import { stopAppLoader } from "../../../../Redux/actionCreators/LoaderActions";

class ThirdPartyServiceErrorBoundary extends Component {
  state = {
    error: undefined,
    info: "",
  };

  static getDerivedStateFromError = (error) => {
    return { error };
  };

  componentDidCatch = (error, info) => {
    this.setState({ error, info });
    this.props.stopLoader();
  };

  render() {
    const { error } = this.state;

    if (error) {
      return <AlertBox type={alertTypes.ERROR} message={error.message} />;
    }

    return this.props.children;
  }
}

const mapDispatchToProps = (dispatch) => ({
  stopLoader: () => dispatch(stopAppLoader()),
});

export default connect(undefined, mapDispatchToProps)(ThirdPartyServiceErrorBoundary);
