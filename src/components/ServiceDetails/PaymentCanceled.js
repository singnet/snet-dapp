import React, { lazy } from "react";
import { connect } from "react-redux";

import Routes from "../../utility/constants/Routes";
import { paymentActions } from "../../Redux/actionCreators";
import withInAppWrapper from "../HOC/WithInAppHeader";

const _serviceDetails = lazy(() => import("./"));
const ServiceDetails = withInAppWrapper(_serviceDetails);

const PaymentCanceled = props => {
  const {
    match: {
      params: { orgId, serviceId, orderId },
    },
    cancelOrder,
    history,
  } = props;
  cancelOrder(orderId);
  history.push(`/${Routes.SERVICE_DETAILS}/org/${orgId}/service/${serviceId}`);
  return <ServiceDetails {...props} />;
};

const mapDispatchToProps = dispatch => ({
  cancelOrder: orderId => dispatch(paymentActions.cancelOrder(orderId)),
});

export default connect(
  null,
  mapDispatchToProps
)(PaymentCanceled);
