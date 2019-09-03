import SnetSDK, { WebServiceClient as ServiceClient } from "snet-sdk-web";
import { API } from "aws-amplify";

import { APIEndpoints, APIPaths } from "../config/APIEndpoints";
import { initializeAPIOptions } from "./API";
import { fetchAuthenticatedUser, walletTypes } from "../Redux/actionCreators/UserActions";
import ProxyPaymentChannelManagementStrategy from "./ProxyPaymentChannelManagementStrategy";

const DEFAULT_GAS_PRICE = 4700000;
const DEFAULT_GAS_LIMIT = 210000;
const ON_ACCOUNT_CHANGE = "accountsChanged";
const ON_NETWORK_CHANGE = "networkChanged";

let sdk;
let web3Provider;

export const callTypes = {
  FREE: "FREE",
  REGULAR: "REGULAR",
};

const parseSignature = data => {
  const hexSignature = data["snet-payment-channel-signature-bin"];
  const signatureBuffer = Buffer.from(hexSignature.slice(2), "hex");
  return signatureBuffer.toString("base64");
};

const parseRegularCallMetadata = ({ data }) => {
  return {
    "snet-payment-type": "escrow",
    "snet-payment-channel-id": data["snet-payment-channel-id"],
    "snet-payment-channel-nonce": data["snet-payment-channel-nonce"],
    "snet-payment-channel-amount": data["snet-payment-channel-amount"],
    "snet-payment-channel-signature-bin": parseSignature(data),
  };
};

const parseFreeCallMetadata = ({ data }) => {
  return {
    "snet-payment-type": data["snet-payment-type"],
    "snet-free-call-user-id": data["snet-free-call-user-id"],
    "snet-current-block-number": `${data["snet-current-block-number"]}`,
    "snet-payment-channel-signature-bin": parseSignature(data),
  };
};

const metadataGenerator = (callType, serviceRequestErrorHandler) => async (serviceClient, serviceName, method) => {
  try {
    const { orgId: org_id, serviceId: service_id } = serviceClient.metadata;
    const { email, token } = await fetchAuthenticatedUser();
    const payload = { org_id, service_id, service_name: serviceName, method, username: email };
    const apiName = APIEndpoints.SIGNER_SERVICE.name;
    const apiOptions = initializeAPIOptions(token, payload);

    if (callType === callTypes.REGULAR) {
      return await API.post(apiName, APIPaths.SIGNER_REGULAR_CALL, apiOptions).then(parseRegularCallMetadata);
    }
    return await API.post(apiName, APIPaths.SIGNER_FREE_CALL, apiOptions).then(parseFreeCallMetadata);
  } catch (err) {
    serviceRequestErrorHandler(err);
  }
};

const generateOptions = (callType, wallet, serviceRequestErrorHandler) => {
  if (process.env.REACT_APP_SANDBOX) {
    return {
      endpoint: process.env.REACT_APP_SANDBOX_SERVICE_ENDPOINT,
      disableBlockchainOperations: true,
    };
  }
  if (callType === callTypes.FREE) {
    return { metadataGenerator: metadataGenerator(callType, serviceRequestErrorHandler) };
  }
  if (wallet && wallet.type === walletTypes.METAMASK) {
    return {};
  }
};

export const initSdk = async () => {
  if (sdk) {
    return sdk;
  }

  const updateSDK = () => {
    const networkId = web3Provider.networkVersion;
    const config = {
      networkId,
      web3Provider,
      defaultGasPrice: DEFAULT_GAS_PRICE,
      defaultGasLimit: DEFAULT_GAS_LIMIT,
    };
    sdk = new SnetSDK(config);
  };

  const hasEth = typeof window.ethereum !== "undefined";
  const hasWeb3 = typeof window.web3 !== "undefined";
  if (hasEth && hasWeb3) {
    web3Provider = window.ethereum;
    const accounts = await web3Provider.enable();
    window.web3.eth.defaultAccount = accounts[0];
    web3Provider.addListener(ON_ACCOUNT_CHANGE, accounts => {
      const event = new CustomEvent("snetMMAccountChanged", { detail: { address: accounts[0] } });
      window.dispatchEvent(event);
    });
    web3Provider.addListener(ON_NETWORK_CHANGE, network => {
      const event = new CustomEvent("snetMMNetworkChanged", { detail: { network } });
      window.dispatchEvent(event);
    });
    updateSDK();
  }
  return sdk;
};

const getMethodNames = service => {
  const ownProperties = Object.getOwnPropertyNames(service);
  return ownProperties.filter(property => {
    if (service[property] && typeof service[property] === typeof {}) {
      return !!service[property].methodName;
    }
  });
};

export const createServiceClient = (
  org_id,
  service_id,
  groupInfo,
  serviceRequestStartHandler,
  serviceRequestCompleteHandler,
  serviceRequestErrorHandler,
  callType,
  wallet
) => {
  if (sdk && sdk.currentChannel) {
    sdk.paymentChannelManagementStrategy = new ProxyPaymentChannelManagementStrategy(sdk.currentChannel);
  }
  const options = generateOptions(callType, wallet, serviceRequestErrorHandler);
  const serviceClient = new ServiceClient(
    sdk,
    org_id,
    service_id,
    sdk && sdk._mpeContract,
    {},
    process.env.REACT_APP_SANDBOX ? {} : groupInfo,
    sdk && sdk._paymentChannelManagementStrategy,
    options
  );

  const onEnd = props => (...args) => {
    try {
      const { status, statusMessage } = args[0];
      if (status !== 0) {
        serviceRequestErrorHandler(statusMessage);
        return;
      }
      props.onEnd(...args);
      if (serviceRequestCompleteHandler) {
        serviceRequestCompleteHandler();
      }
    } catch (error) {
      serviceRequestErrorHandler(error);
    }
  };

  const requestStartHandler = () => {
    if (serviceRequestStartHandler) {
      serviceRequestStartHandler();
    }
  };

  return {
    invoke(methodDescriptor, props) {
      requestStartHandler();
      serviceClient.invoke(methodDescriptor, { ...props, onEnd: onEnd(props) });
    },
    unary(methodDescriptor, props) {
      requestStartHandler();
      serviceClient.unary(methodDescriptor, { ...props, onEnd: onEnd(props) });
    },
    getMethodNames,
  };
};

export default sdk;
