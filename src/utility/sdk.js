import { WebServiceClient as ServiceClient } from "snet-sdk-web";
import { API, Auth } from "aws-amplify";

import { APIEndpoints, APIPaths } from "../config/APIEndpoints";
import { initializeAPIOptions } from "./API";

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

const fetchAuthUser = async () => {
  const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
  return { email: currentUser.attributes.email, token: currentUser.signInUserSession.idToken.jwtToken };
};

const metadataGenerator = callType => async (serviceClient, serviceName, method) => {
  try {
    const { orgId: org_id, serviceId: service_id } = serviceClient.metadata;
    const { email, token } = await fetchAuthUser();
    const payload = { org_id, service_id, service_name: serviceName, method, username: email };
    const apiName = APIEndpoints.SIGNER_SERVICE.name;
    const apiOptions = initializeAPIOptions(token, payload);

    if (callType === callTypes.REGULAR) {
      return API.post(apiName, APIPaths.SIGNER_REGULAR_CALL, apiOptions).then(parseRegularCallMetadata);
    }
    return API.post(apiName, APIPaths.SIGNER_FREE_CALL, apiOptions).then(parseFreeCallMetadata);
  } catch (err) {
    throw err;
  }
};

const parseServiceMetadata = response => {
  const { data: groups } = response;
  const endpoints = groups.map(({ group_name, endpoints }) => ({ group_name, ...endpoints[0] }));
  const defaultGroup = groups.find(group => group.group_name === "default_group");
  //Get rid of the hardcoded endpoint once happy path demo is done
  endpoints[0].endpoint = "https://example-service-a.singularitynet.io:8089";
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

  return { metadataGenerator: metadataGenerator(callType) };
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

const getMethodNames = service => {
  const ownProperties = Object.getOwnPropertyNames(service);
  return ownProperties.filter(property => {
    if (service[property] && typeof service[property] === typeof {}) {
      return !!service[property].methodName;
    }
  });
};
