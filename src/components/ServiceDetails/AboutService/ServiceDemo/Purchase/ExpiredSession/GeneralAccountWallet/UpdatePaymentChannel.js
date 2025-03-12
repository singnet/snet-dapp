import { useDispatch, useSelector } from "react-redux";
import { updateChannelBalanceAPI } from "../../../../../../../Redux/actionCreators/UserActions";
import VerifyKey from "./PaymentPopup/VerifyKey";
import { WebServiceClient } from "snet-sdk-web";
import PaymentChannelManagement from "../../../../../../../utility/PaymentChannelManagement";
import { cogsToAgi } from "../../../../../../../utility/PricingStrategy";
import { useParams } from "react-router-dom";
import { groupInfo } from "../../../../../../../Redux/reducers/ServiceDetailsReducer";
import { initPaypalSdk } from "../../../../../../../utility/sdk";
import { channelInfo as getChannelInfo } from "../../../../../../../Redux/reducers/UserReducer";
import { useState } from "react";

const UpdatePaymentChannel = ({ setActualBalance, handleLostKey }) => {
  const dispatch = useDispatch();
  const { orgId, serviceId } = useParams();
  const walletList = useSelector((state) => state.userReducer.walletList);
  const channelInfo = getChannelInfo(walletList);
  const group = useSelector((state) => groupInfo(state));

  const [privateKey, setPrivateKey] = useState();

  const initializatePaypalSdk = (privateKey) => {
    console.log("channelInfo: ", channelInfo);

    if (process.env.REACT_APP_SANDBOX || !channelInfo?.walletaddress || !channelInfo?.id || !privateKey) {
      return;
    }
    setPrivateKey(privateKey);
    const sdk = initPaypalSdk(channelInfo?.walletaddress, channelInfo.id, privateKey);
    return sdk;
  };

  const updateChannelBalance = async (availableAmount, amountDeposited, nonce) => {
    await dispatch(
      updateChannelBalanceAPI(
        orgId,
        serviceId,
        group.group_id,
        Number(amountDeposited - availableAmount),
        Number(amountDeposited),
        Number(channelInfo.id),
        Number(nonce)
      )
    );
  };

  const initializePaymentChannel = async (privateKey) => {
    try {
      const sdk = initializatePaypalSdk(privateKey);
      if (!sdk) {
        return;
      }
      const serviceClient = new WebServiceClient(sdk, orgId, serviceId, sdk._mpeContract, {}, group);
      const paymentChannelManagement = new PaymentChannelManagement(sdk, serviceClient);

      await paymentChannelManagement.updateChannelInfo();
      const availableBalance = paymentChannelManagement.availableBalance();

      setActualBalance(cogsToAgi(availableBalance));
      await updateChannelBalance(
        availableBalance,
        Number(paymentChannelManagement.channel.state.amountDeposited),
        paymentChannelManagement.channel.state.nonce
      );
    } catch (error) {
      console.log("initializePaymentChannel error: ", error);
    }
  };

  if (!privateKey) {
    return (
      <VerifyKey
        handleUserProvidedPrivateKey={initializePaymentChannel}
        handleNextSection={initializePaymentChannel}
        handleLostPrivateKey={handleLostKey}
      />
    );
  }
};

export default UpdatePaymentChannel;
