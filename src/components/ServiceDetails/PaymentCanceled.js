import React from "react";
import { connect } from "react-redux";

import Routes from "../../utility/constants/Routes";
import { paymentActions } from "../../Redux/actionCreators";
import { CircularProgress } from "@material-ui/core";

class PaymentCanceled extends React.Component {
  componentDidMount = () => {
    const {
      match: {
        params: { orgId, serviceId, orderId },
      },
      cancelOrder,
      history,
    } = this.props;
    cancelOrder(orderId);
    history.push(`/${Routes.SERVICE_DETAILS}/org/${orgId}/service/${serviceId}`);
  };

  render() {
    return <CircularProgress />;
  }
}

const mapDispatchToProps = dispatch => ({
  cancelOrder: orderId => dispatch(paymentActions.cancelOrder(orderId)),
});

export default connect(
  null,
  mapDispatchToProps
)(PaymentCanceled);
