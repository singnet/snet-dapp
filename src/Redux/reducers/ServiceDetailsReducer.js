import { serviceDetailsActions } from "../actionCreators";
import find from "lodash/find";
import first from "lodash/first";
import some from "lodash/some";

const InitialServiceDetails = {
  details: {},
  freeCalls: {},
};

const serviceDetailsReducer = (state = InitialServiceDetails, action) => {
  switch (action.type) {
    case serviceDetailsActions.RESET_SERVICE_DETAILS: {
      return InitialServiceDetails;
    }
    case serviceDetailsActions.UPDATE_SERVICE_DETAILS: {
      return { ...state, details: action.payload.data };
    }
    case serviceDetailsActions.UPDATE_FREE_CALLS_INFO: {
      return { ...state, freeCalls: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const freeCalls = state => {
  return state.serviceDetailsReducer.freeCalls;
};

export const currentServiceDetails = state => {
  return state.serviceDetailsReducer.details;
};

export const serviceDetails = (state, orgId, serviceId) => {
  const { org_id, service_id } = currentServiceDetails(state);
  if (org_id !== orgId || service_id !== serviceId) {
    return undefined;
  }

  return currentServiceDetails(state);
};

const groups = state => {
  return state.serviceDetailsReducer.details.groups;
};

export const groupInfo = state => {
  const serviceGroups = groups(state);
  const availableGroup = find(serviceGroups, ({ endpoints }) =>
    some(endpoints, endpoint => endpoint.is_available === 1)
  );
  if (availableGroup) {
    return availableGroup;
  }
  const firstGroup = first(serviceGroups);
  return firstGroup;
};

export const pricing = state => {
  const group = groupInfo(state);
  if (!group) return {};

  return find(group.pricing, price => price.default === true);
};

export default serviceDetailsReducer;
