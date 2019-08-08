import { WebServiceClient as ServiceClient } from "snet-sdk-web";
import { API, Auth } from "aws-amplify";

import { APIEndpoints, APIPaths } from "../config/APIEndpoints";
import { initializeAPIOptions } from "./API";

export const callTypes = {
  FREE: "FREE",
  REGULAR: "REGULAR",
};

const parseRegularCallMetadata = (metadata, response) => {
  const { data } = response;
  // const channelId = data["snet-payment-channel-id"];
  const nonce = data["snet-payment-channel-nonce"];
  const signingAmount = data["snet-payment-channel-amount"];
  const hexSignature = data["snet-payment-channel-signature-bin"];
  const signatureBytes = Buffer.from(hexSignature, "hex");

  metadata.append("snet-payment-type", "escrow");
  metadata.append("snet-payment-channel-id", data["snet-payment-channel-id"]);
  metadata.append("snet-payment-channel-nonce", `${nonce}`);
  metadata.append("snet-payment-channel-amount", `${signingAmount}`);
  metadata.append("snet-payment-channel-signature-bin", signatureBytes.toString("base64"));
  return metadata;
};

const parseFreeCallMetadata = (metadata, response) => {
  const { data } = response;
  const currentBlockNumber = data["snet-current-block-number"];
  const userId = data["snet-free-call-user-id"];
  const hexSignature = data["snet-payment-channel-signature-bin"];
  const signatureBytes = Buffer.from(hexSignature, "hex");
  // Append the appropriate metadata
  metadata.append("");
  return { currentBlockNumber, userId, signatureBytes };
};

const metadataAPI = (callType, token, payload) => {
  const apiName = APIEndpoints.SIGNER_SERVICE.name;
  let apiPath = APIPaths.SIGNER_FREE_CALL;
  if (callType === callTypes.REGULAR) {
    apiPath = APIPaths.SIGNER_REGULAR_CALL;
  }
  const apiOptions = initializeAPIOptions(token, payload);
  return API.post(apiName, apiPath, apiOptions);
};

const metadataGenerator = (username, callType) => async (serviceClient, metadata, serviceName, method) => {
  try {
    const { orgId: org_id, serviceId: service_id } = serviceClient.metadata;
    const payload = { org_id, service_id, service_name: serviceName, method, username: "n.vin95@gmail.com" };
    const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
    return await metadataAPI(callType, currentUser.signInUserSession.idToken.jwtToken, payload).then(response => {
      if (callType === callTypes.REGULAR) {
        return parseRegularCallMetadata(metadata, response);
      }
      return parseFreeCallMetadata(metadata, response);
    });
  } catch (err) {
    throw err;
  }
};

const parseServiceMetadata = response => {
  const { data: groups } = response;
  const endpoints = groups.map(({ group_name, endpoints }) => ({ group_name, ...endpoints[0] }));
  const defaultGroup = groups.find(group => group.group_name === "default_group");

  return { defaultGroup, groups, endpoints };
};

const fetchServiceMetadata = async (org_id, service_id) => {
  if (process.env.REACT_APP_SANDBOX) {
    return {};
  }

  const apiEndpoint = `${APIEndpoints.CONTRACT.endpoint}/org/${org_id}/service/${service_id}/group`;
  return fetch(apiEndpoint)
    .then(res => res.json())
    .then(parseServiceMetadata);
};

const generateOptions = (username, callType) => {
  if (process.env.REACT_APP_SANDBOX) {
    return {
      endpoint: process.env.REACT_APP_SANDBOX_SERVICE_ENDPOINT,
      disableBlockchainOperations: true,
    };
  }

  return { metadataGenerator: metadataGenerator(username, callType) };
};

export const createServiceClient = async (
  org_id,
  service_id,
  username,
  serviceRequestStartHandler,
  serviceRequestCompleteHandler,
  callType
) => {
  const options = generateOptions(username, callType);
  const metadata = await fetchServiceMetadata(org_id, service_id);
  const serviceClient = new ServiceClient(
    undefined,
    org_id,
    service_id,
    undefined,
    metadata,
    metadata.defaultGroup,
    undefined,
    options
  );
  const onEnd = props => (...args) => {
    props.onEnd(...args);
    if (serviceRequestCompleteHandler) {
      serviceRequestCompleteHandler();
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

export const getMethodNames = service => {
  const ownProperties = Object.getOwnPropertyNames(service);
  return ownProperties.filter(property => {
    if (service[property] && typeof service[property] === typeof {}) {
      return !!service[property].methodName;
    }
  });
};
