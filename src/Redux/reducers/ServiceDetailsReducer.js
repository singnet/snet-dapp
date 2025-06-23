import { serviceDetailsActions } from "../actionCreators";
import find from "lodash/find";
import first from "lodash/first";
import some from "lodash/some";
import map from "lodash/map";

const InitialServiceDetails = {
  freeCalls: {
    freeCallsTotal: 0,
    freeCallsAvailable: 0,
  },
  freeCallSignature: { signature: "", expirationBlock: "", freeCallToken: "", signerAddress: "" },
  details: {},
  detailsTraining: {},
};

const serviceDetailsReducer = (state = InitialServiceDetails, action) => {
  switch (action.type) {
    case serviceDetailsActions.RESET_SERVICE_DETAILS: {
      return InitialServiceDetails;
    }
    case serviceDetailsActions.UPDATE_SERVICE_DETAILS: {
      return { ...state, details: action.payload };
    }
    case serviceDetailsActions.UPDATE_FREE_CALLS_INFO: {
      return { ...state, freeCalls: action.payload };
    }
    case serviceDetailsActions.UPDATE_TRAINING_DETAILS: {
      return { ...state, detailsTraining: action.payload };
    }
    case serviceDetailsActions.UPDATE_FREECALL_SIGNATURE: {
      return { ...state, freeCallSignature: action.payload };
    }
    default: {
      return state;
    }
  }
};

const enhanceGroup = (group) => ({ ...group, endpoints: map(group.endpoints, ({ endpoint }) => endpoint) });

export const currentServiceDetails = (state) => {
  return state.serviceDetailsReducer.details;
};

export const serviceDetails = (state, orgId, serviceId) => {
  const { org_id, service_id } = currentServiceDetails(state);
  if (org_id !== orgId || service_id !== serviceId) {
    return undefined;
  }

  return currentServiceDetails(state);
};

export const groupInfo = (state) => {
  const serviceGroups = state.serviceDetailsReducer.details.groups;
  const availableGroup = find(serviceGroups, ({ endpoints }) =>
    some(endpoints, (endpoint) => endpoint.is_available === 1)
  );
  if (availableGroup) {
    return enhanceGroup(availableGroup);
  }
  const firstGroup = first(serviceGroups);
  if (firstGroup) {
    return enhanceGroup(firstGroup);
  }
};

export const pricing = (state) => {
  const group = groupInfo(state);
  if (!group) return {};

  return find(group.pricing, (price) => price.default === true);
};

export default serviceDetailsReducer;
