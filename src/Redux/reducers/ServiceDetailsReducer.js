import { serviceDetailsActions } from "../actionCreators";
import find from "lodash/find";
import first from "lodash/first";
import some from "lodash/some";

const InitialServiceDetails = {
  serviceMetadata: {
    groups: [],
  },
  freeCallsRemaining: 0,
  freeCallsAllowed: 0,
};

const serviceDetailsReducer = (state = InitialServiceDetails, action) => {
  switch (action.type) {
    case serviceDetailsActions.RESET_SERVICE_METADATA: {
      return { ...state, serviceMetadata: {} };
    }
    case serviceDetailsActions.UPDATE_SERVICE_METADATA: {
      return { ...state, serviceMetadata: { groups: action.payload.data } };
    }
    case serviceDetailsActions.UPDATE_FREE_CALLS_ALLOWED: {
      return { ...state, freeCallsAllowed: action.payload };
    }
    case serviceDetailsActions.UPDATE_FREE_CALLS_REMAINING: {
      return { ...state, freeCallsRemaining: action.payload };
    }
    default: {
      return state;
    }
  }
};

const groups = state => {
  return state.serviceDetailsReducer.serviceMetadata.groups;
};

export const groupInfo = state => {
  //hardcoded-data
  const payment = {
    payment_address: "0xBEEC34186ed77F1CEbb92fd1C11cDD2F9789Dbe5",
    payment_channel_storage_type: "etcd",
    payment_expiration_threshold: 100,
    payment_channel_storage_client: {
      endpoints: ["https://snet-etcd.singularitynet.io:2379"],
      request_timeout: "8s",
      connection_timeout: "100s",
    },
  };
  // till here
  const serviceGroups = groups(state);
  const availableGroup = find(serviceGroups, ({ endpoints }) =>
    some(endpoints, endpoint => endpoint.is_available === 1)
  );
  if (availableGroup) {
    return { ...availableGroup, payment };
  }

  const firstGroup = first(serviceGroups);
  return firstGroup && { ...firstGroup, payment };
};

export const pricing = state => {
  const group = groupInfo(state);
  if (!group) return {};

  return find(group.pricing, price => price.default === true);
};

export default serviceDetailsReducer;
