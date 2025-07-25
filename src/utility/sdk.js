import SnetSDK from "snet-sdk-web";
import { FreecallMetadataGenerator, hexStringToBytes } from "snet-sdk-web/utils";
import { FreeCallPaymentStrategy, PaidPaymentStrategy } from "snet-sdk-web/paymentStrategies";

import MPEContract from "singularitynet-platform-contracts/networks/MultiPartyEscrow";
import { APIEndpoints, APIPaths } from "../config/APIEndpoints";
import { initializeAPIOptions, postAPI } from "./API";
import { fetchAuthenticatedUser, walletTypes } from "../Redux/actionCreators/UserActions";
import PaypalPaymentMgmtStrategy from "./PaypalPaymentMgmtStrategy";
import { store } from "../";
import { getFreeCallSign } from "../Redux/actionCreators/ServiceDetailsActions";

const DEFAULT_GAS_PRICE = 4700000;
const DEFAULT_GAS_LIMIT = 210000;
export const ON_ACCOUNT_CHANGE = "accountsChanged";
export const ON_NETWORK_CHANGE = "chainChanged";

const EXPECTED_ID_ETHEREUM_NETWORK = Number(process.env.REACT_APP_ETH_NETWORK);

let sdk;
let serviceMetadataProvider;

export const callTypes = {
  FREE: "FREE",
  REGULAR: "REGULAR",
};

export const parseSignature = (hexSignature) => {
  const signatureBuffer = Buffer.from(hexSignature.slice(2), "hex");
  return signatureBuffer.toString("base64");
};

export const decodeGroupId = (encodedGroupId) => {
  const groupIdBuffer = Buffer.from(encodedGroupId, "base64");
  return `0x${groupIdBuffer.toString("hex")}`;
};

const parseRegularCallMetadata = ({ data }) => ({
  signatureBytes: parseSignature(data["snet-payment-channel-signature-bin"]),
  "snet-payment-mpe-address":
    MPEContract[process.env.REACT_APP_ETH_NETWORK][process.env.REACT_APP_TOKEN_NAME][process.env.REACT_APP_STAND]
      .address,
});

const parseFreeCallMetadata = (data) => {
  const MetadataGenerator = new FreecallMetadataGenerator();
  const metadataFields = {
    type: "free-call",
    userAddress: data.signerAddress,
    currentBlockNumber: data.currentBlockNumber,
    freecallAuthToken: hexStringToBytes(data.freeCallToken),
    signatureBytes: hexStringToBytes(data.signature),
    userId: data.userId,
  };
  return MetadataGenerator.generateMetadata(metadataFields);
};

export const createFreecallStrategy = async (orgId, serviceId, groupName, options) => {
  if (
    !serviceMetadataProvider ||
    serviceMetadataProvider.serviceMetadata.orgId !== orgId ||
    serviceMetadataProvider.serviceMetadata.serviceId !== serviceId
  ) {
    await createMetadataProvider(orgId, serviceId, groupName, options);
  }

  const paymentStrategy = new FreeCallPaymentStrategy(sdk.account, serviceMetadataProvider);
  return paymentStrategy;
};

const metadataGenerator = (serviceRequestErrorHandler, groupId) => async (serviceClient) => {
  try {
    const { orgId, serviceId } = serviceClient.metadataProvider.serviceMetadata;
    const meta = await store.dispatch(getFreeCallSign(orgId, serviceId, groupId));
    return parseFreeCallMetadata(meta);
  } catch (err) {
    console.error("error on generating metadata: ", err);
    serviceRequestErrorHandler(err);
  }
};

const parseChannelStateRequestSigner = ({ data }) => ({
  currentBlockNumber: data["snet-current-block-number"],
  signatureBytes: parseSignature(data.signature),
});

const channelStateRequestSigner = async (channelId) => {
  const apiName = APIEndpoints.SIGNER_SERVICE.name;
  const stateServicePayload = { channel_id: Number(channelId) };
  const { token } = await store.dispatch(fetchAuthenticatedUser());
  const stateServiceOptions = initializeAPIOptions(token, stateServicePayload);
  return await postAPI(apiName, APIPaths.SIGNER_STATE_SERVICE, stateServiceOptions).then(
    parseChannelStateRequestSigner
  ); //TODO
};

const paidCallMetadataGenerator = (serviceRequestErrorHandler) => async (channelId, signingAmount, nonce) => {
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
    const regularCallMetadata = await postAPI(apiName, APIPaths.SIGNER_REGULAR_CALL, RegCallOptions);
    const paidCallMetadata = parseRegularCallMetadata(regularCallMetadata);
    return Promise.resolve(paidCallMetadata);
  } catch (error) {
    serviceRequestErrorHandler(error);
  }
};

const generateOptions = (callType, wallet, serviceRequestErrorHandler, groupInfo) => {
  console.log("callType: ", callType);

  const defaultOptions = { concurrency: false };
  if (process.env.REACT_APP_SANDBOX) {
    return {
      ...defaultOptions,
      endpoint: process.env.REACT_APP_SANDBOX_SERVICE_ENDPOINT,
      disableBlockchainOperations: true,
    };
  }
  if (callType === callTypes.FREE) {
    return { ...defaultOptions, metadataGenerator: metadataGenerator(serviceRequestErrorHandler, groupInfo.groupId) };
  }
  console.log("wallet: ", wallet);

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

export const initPaypalSdk = (address, channelId) => {
  const config = {
    networkId: process.env.REACT_APP_ETH_NETWORK,
    web3Provider: process.env.REACT_APP_WEB3_PROVIDER,
    defaultGasPrice: DEFAULT_GAS_PRICE,
    defaultGasLimit: DEFAULT_GAS_LIMIT,
    tokenName: process.env.REACT_APP_TOKEN_NAME,
    standType: process.env.REACT_APP_STAND,
  };
  sdk = new PaypalSDK(address, config, {});
  sdk.paymentChannelManagementStrategy = new PaypalPaymentMgmtStrategy(sdk, channelId);
  return sdk;
};

export const initSdk = async () => {
  if (sdk && !(sdk instanceof PaypalSDK)) {
    return Promise.resolve(sdk);
  }

  const config = {
    networkId: EXPECTED_ID_ETHEREUM_NETWORK,
    web3Provider: window.ethereum,
    defaultGasPrice: DEFAULT_GAS_PRICE,
    defaultGasLimit: DEFAULT_GAS_LIMIT,
    tokenName: process.env.REACT_APP_TOKEN_NAME,
    standType: process.env.REACT_APP_STAND,
  };

  sdk = await new SnetSDK(config);
  return Promise.resolve(sdk);
};

const getMethodNames = (service) => {
  const ownProperties = Object.getOwnPropertyNames(service);
  return ownProperties.filter((property) => {
    if (service[property] && typeof service[property] === typeof {}) {
      return !!service[property].methodName;
    }
    return null;
  });
};

const createMetadataProvider = async (orgId, serviceId, groupName, options) => {
  serviceMetadataProvider = await sdk.createServiceMetadataProvider(orgId, serviceId, groupName, options);
};

export const createServiceClient = async (
  orgId,
  serviceId,
  groupInfo,
  serviceRequestStartHandler,
  serviceRequestCompleteHandler,
  serviceRequestErrorHandler,
  callType,
  wallet
) => {
  const options = generateOptions(callType, wallet, serviceRequestErrorHandler, groupInfo);
  await createMetadataProvider(orgId, serviceId, groupInfo.groupName, options);
  const serviceClient = await sdk.createServiceClient({
    paymentStrategy: new PaidPaymentStrategy(sdk.account, serviceMetadataProvider),
    serviceMetadataProvider,
    options,
  });
  const finishServiceInteraction = () => {
    if (serviceRequestCompleteHandler) {
      serviceRequestCompleteHandler();
      return;
    }
  };

  const onEnd =
    (props) =>
    (...args) => {
      try {
        const { status, statusMessage } = args[0];
        if (status !== 0) {
          serviceRequestErrorHandler(statusMessage);
          return;
        }

        if (props.onEnd) {
          props.onEnd(...args);
        }

        if (props.preventCloseServiceOnEnd) {
          return;
        }

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
      stopService() {
        finishServiceInteraction();
      },
      getMethodNames,
    };
  } catch (error) {
    serviceRequestErrorHandler(error);
  }
};

export default sdk;
