import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
      orderId: "",
    };
    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;
    const isLoadedButWasntLoadedBefore = !this.state.showButton && !this.props.isScriptLoaded && isScriptLoaded;
    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
  }

  payment = async (data, actions) => {
    console.log("payment data", data, actions);
    try {
      const response = await actions.request.post(
        "https://3240791e-40ca-4b99-90cb-44a215e7c397.mock.pstmn.io/order/initiate",
        { username: "ichbinvivek@gmail.com", amount: 20, currency: "USD", org_id: "snet", group_id: 0 }
      );
      console.log("payment", response);
    } catch (error) {
      console.log("paymnet err", error);
    }
  };

  onAuthorize = async (data, actions) => {
    console.log("onAuthorize data", data);
    try {
      const response = await actions.request.post(
        "https://3240791e-40ca-4b99-90cb-44a215e7c397.mock.pstmn.io/order/execute",
        {
          paymentID: data.paymentID,
          payerID: data.payerID,
        }
      );
      console.log("onAuthorize res", response);
    } catch (error) {
      console.log("authorize err", error);
    }
  };

  render() {
    const { total, currency, env, commit, client, onSuccess, onError, onCancel } = this.props;
    const { showButton } = this.state;

    return (
      <div>
        {showButton && (
          // eslint-disable-next-line react/jsx-no-undef
          <paypal.Button.react
            env={env}
            client={client}
            // commit={commit}
            payment={this.payment}
            onAuthorize={this.onAuthorize}
            onCancel={onCancel}
            onError={onError}
          />
        )}
      </div>
    );
  }
}
export default scriptLoader("https://www.paypalobjects.com/api/checkout.js")(PaypalButton);
