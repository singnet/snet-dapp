import React, { Component } from "react";

class ThirdPartyServiceErrorBoundary extends Component {
  state = {
    error: undefined,
    info: "",
  };

  static getDerivedStateFromError = error => {
    return { error };
  };

  componentDidCatch = (error, info) => {
    this.setState({ error, info });
  };

  render() {
    const { error, info } = this.state;

    if (error) {
      return (
        <p>
          <strong>Err:</strong>
          {info}
        </p>
      );
    }

    return this.props.children;
  }
}

export default ThirdPartyServiceErrorBoundary;
