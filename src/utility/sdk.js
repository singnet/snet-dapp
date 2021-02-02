import SnetSDK, { WebServiceClient as ServiceClient, DefaultPaymentStrategy } from "snet-sdk-web";
import API from "@aws-amplify/api";
import MPEContract from "singularitynet-platform-contracts/networks/MultiPartyEscrow";

import { APIEndpoints, APIPaths } from "../config/APIEndpoints";
import { initializeAPIOptions } from "./API";
import { fetchAuthenticatedUser, walletTypes } from "../Redux/actionCreators/UserActions";
import PaypalPaymentMgmtStrategy from "./PaypalPaymentMgmtStrategy";
import { ethereumMethods } from "./constants/EthereumUtils";
import { store } from "../";

const DEFAULT_GAS_PRICE = 4700000;
const DEFAULT_GAS_LIMIT = 210000;
const ON_ACCOUNT_CHANGE = "accountsChanged";
const ON_NETWORK_CHANGE = "chainChanged";

let sdk;
let channel;
let web3Provider;

export const callTypes = {
  FREE: "FREE",
  REGULAR: "REGULAR",
};

export const parseSignature = hexSignature => {
  const signatureBuffer = Buffer.from(hexSignature.slice(2), "hex");
  return signatureBuffer.toString("base64");
};

export const decodeGroupId = encodedGroupId => {
  const groupIdBuffer = Buffer.from(encodedGroupId, "base64");
  return `0x${groupIdBuffer.toString("hex")}`;
};

const parseRegularCallMetadata = ({ data }) => ({
  signatureBytes: parseSignature(data["snet-payment-channel-signature-bin"]),
  "snet-payment-mpe-address": MPEContract[process.env.REACT_APP_ETH_NETWORK].address,
});

const parseFreeCallMetadata = ({ data }) => ({
  "snet-payment-type": data["snet-payment-type"],
  "snet-free-call-user-id": data["snet-free-call-user-id"],
  "snet-current-block-number": `${data["snet-current-block-number"]}`,
  "snet-payment-channel-signature-bin": parseSignature(data["snet-payment-channel-signature-bin"]),
  "snet-free-call-auth-token-bin": parseSignature(data["snet-free-call-auth-token-bin"]),
  "snet-free-call-token-expiry-block": `${data["snet-free-call-token-expiry-block"]}`,
  "snet-payment-mpe-address": MPEContract[process.env.REACT_APP_ETH_NETWORK].address,
});

const metadataGenerator = (serviceRequestErrorHandler, groupId) => async (serviceClient, serviceName, method) => {
  try {
    const { orgId: org_id, serviceId: service_id } = serviceClient.metadata;
    const { email, token } = await store.dispatch(fetchAuthenticatedUser());
    const payload = { org_id, service_id, service_name: serviceName, method, username: email, group_id: groupId };
    const apiName = APIEndpoints.SIGNER_SERVICE.name;
    const apiOptions = initializeAPIOptions(token, payload);
    return await API.post(apiName, APIPaths.SIGNER_FREE_CALL, apiOptions).then(parseFreeCallMetadata);
  } catch (err) {
    serviceRequestErrorHandler(err);
  }
};

const parseChannelStateRequestSigner = ({ data }) => ({
  currentBlockNumber: data["snet-current-block-number"],
  signatureBytes: parseSignature(data.signature),
});

const channelStateRequestSigner = async channelId => {
  const apiName = APIEndpoints.SIGNER_SERVICE.name;
  const stateServicePayload = { channel_id: Number(channelId) };
  const { token } = await store.dispatch(fetchAuthenticatedUser());
  const stateServiceOptions = initializeAPIOptions(token, stateServicePayload);
  return await API.post(apiName, APIPaths.SIGNER_STATE_SERVICE, stateServiceOptions).then(
    parseChannelStateRequestSigner
  );
};

const paidCallMetadataGenerator = serviceRequestErrorHandler => async (channelId, signingAmount, nonce) => {
  try {
    const apiName = APIEndpoints.SIGNER_SERVICE.name;
    const enhancedChannelId = parseInt(channelId.toFixed());
    const RegCallPayload = {
      channel_id: enhancedChannelId,
      amount: Number(signingAmount),
      nonce: Number(nonce),
    };
    const { token } = await store.dispatch(fetchAuthenticatedUser());
    const RegCallOptions = initializeAPIOptions(token, RegCallPayload);
    const response = await API.post(apiName, APIPaths.SIGNER_REGULAR_CALL, RegCallOptions);
    const paidCallMetadata = parseRegularCallMetadata(response);
    return Promise.resolve(paidCallMetadata);
  } catch (error) {
    serviceRequestErrorHandler(error);
  }
};

const generateOptions = (callType, wallet, serviceRequestErrorHandler, groupInfo, org_id, service_id) => {
  const defaultOptions = { concurrency: false };
  if (process.env.REACT_APP_SANDBOX) {
    return {
      ...defaultOptions,
      endpoint: process.env.REACT_APP_SANDBOX_SERVICE_ENDPOINT,
      disableBlockchainOperations: true,
    };
  }
  if (callType === callTypes.FREE) {
    return { ...defaultOptions, metadataGenerator: metadataGenerator(serviceRequestErrorHandler, groupInfo.group_id) };
  }
  if (wallet && wallet.type === walletTypes.METAMASK) {
    return { ...defaultOptions };
  }
  if (callType === callTypes.REGULAR) {
    return {
      ...defaultOptions,
      channelStateRequestSigner,
      paidCallMetadataGenerator: paidCallMetadataGenerator(serviceRequestErrorHandler),
    };
  }
};

class PaypalIdentity {
  constructor(address, web3) {
    this._web3 = web3;
    this._web3.eth.defaultAccount = address;
  }

  getAddress() {
    return this._web3.eth.defaultAccount;
  }
}

class PaypalSDK extends SnetSDK {
  constructor(address, ...args) {
    super(...args);
    this._address = address;
  }

  _createIdentity() {
    return new PaypalIdentity(this._address, this._web3);
  }
}

export const initPaypalSdk = (address, channelInfo) => {
  const config = {
    networkId: process.env.REACT_APP_ETH_NETWORK,
    web3Provider: process.env.REACT_APP_WEB3_PROVIDER,
    defaultGasPrice: DEFAULT_GAS_PRICE,
    defaultGasLimit: DEFAULT_GAS_LIMIT,
  };
  sdk = new PaypalSDK(address, config, {});
  sdk.paymentChannelManagementStrategy = new PaypalPaymentMgmtStrategy(sdk, channelInfo.id);
};

export const updateChannel = newChannel => {
  channel = newChannel;
};

export const initSdk = async address => {
  const updateSDK = async () => {
    const chainIdHex = web3Provider.chainId;
    const networkId = parseInt(chainIdHex);

    const config = {
      networkId,
      web3Provider,
      defaultGasPrice: DEFAULT_GAS_PRICE,
      defaultGasLimit: DEFAULT_GAS_LIMIT,
    };

    sdk = new SnetSDK(config);
    await sdk.setupAccount();
  };

  if (sdk && address) {
    const currentAddress = await sdk.account.getAddress();
    if (currentAddress.toLowerCase() !== address.toLowerCase()) {
      await updateSDK();
    }
    return Promise.resolve(sdk);
  }

  if (sdk && !(sdk instanceof PaypalSDK)) {
    return Promise.resolve(sdk);
  }

  const hasEth = typeof window.ethereum !== "undefined";

  if (hasEth) {
    web3Provider = window.ethereum;
    await web3Provider.request({ method: ethereumMethods.REQUEST_ACCOUNTS });
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
  return Promise.resolve(sdk);
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
  wallet,
  channelInfo
) => {
  if (sdk && channel) {
    // sdk.paymentChannelManagementStrategy = new ProxyPaymentChannelManagementStrategy(channel);
  }
  const options = generateOptions(callType, wallet, serviceRequestErrorHandler, groupInfo, org_id, service_id);
  let paymentChannelManagementStrategy = sdk && sdk._paymentChannelManagementStrategy;
  if (!(paymentChannelManagementStrategy instanceof PaypalPaymentMgmtStrategy)) {
    paymentChannelManagementStrategy = new DefaultPaymentStrategy(1);
  }
  const serviceClient = new ServiceClient(
    sdk,
    org_id,
    service_id,
    sdk && sdk._mpeContract,
    {},
    process.env.REACT_APP_SANDBOX ? {} : groupInfo,
    paymentChannelManagementStrategy,
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
  try {
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
  } catch (error) {
    serviceRequestErrorHandler(error);
  }
};

export default sdk;
