import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Routes from "../../utility/constants/Routes";
import { paymentActions } from "../../Redux/actionCreators";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const PaymentCancelled = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orgId, serviceId, orderId } = useParams();

  useEffect(() => {
    dispatch(paymentActions.cancelOrder(orderId));
    navigate(`/${Routes.SERVICE_DETAILS}/org/${orgId}/service/${serviceId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate]);

  return <CircularProgress />;
};

export default PaymentCancelled;
