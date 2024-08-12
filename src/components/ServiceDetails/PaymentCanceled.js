import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Routes from "../../utility/constants/Routes";
import { paymentActions } from "../../Redux/actionCreators";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const PaymentCanceled = () => {
  const dispatch = useDispatch();
  const { orgId, serviceId, orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(paymentActions.cancelOrder(orderId));
    navigate(`/${Routes.SERVICE_DETAILS}/org/${orgId}/service/${serviceId}`);
  }, []);

  return <CircularProgress />;
};

export default PaymentCanceled;
