import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Routes from "../../utility/constants/Routes";
import { paymentActions } from "../../Redux/actionCreators";

const PaymentCanceled = props => {
  const {
    match: {
      params: { orgId, serviceId, orderId },
    },
    cancelOrder,
  } = props;
  cancelOrder(orderId);
  return <Redirect to={`/${Routes.SERVICE_DETAILS}/org/${orgId}/service/${serviceId}`} />;
};

const mapDispatchToProps = dispatch => ({
  cancelOrder: orderId => dispatch(paymentActions.cancelOrder(orderId)),
});

export default connect(
  null,
  mapDispatchToProps
)(PaymentCanceled);
